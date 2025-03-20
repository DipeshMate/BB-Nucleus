from bats.models import Bat, BatGallery
from .models import Cart, CartItem
from .serializer import CartSerializers, CartItemSerializers, SimpleCartSerializer, MessagesSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
# from accounts.authentication import CookieJWTAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication, JWTTokenUserAuthentication
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
import uuid
from django.conf import settings 

class AddToCartModelViewSet(ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartSerializers #cartitem serialize tha
    authentication_classes= [JWTAuthentication] # will only authenticate user & pass jwtAuth works
    permission_classes=[IsAuthenticated] #default for all functions
    
    @action(detail=False, methods=['post'], url_path='add',permission_classes=[AllowAny])
    def add_to_cart(self, request):
        user = request.user if request.user.is_authenticated else None
        product_id = request.data.get('product_id')
        cart_id = request.data.get('cart_id')
        quantity = int(request.data.get('quantity', 1))
        # print('add_to_cart user:',user,' and quantity',quantity)
        
        if not product_id:
            return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not cart_id:
            return Response({"error": "Cart ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Bat.objects.get(id=product_id)
        except Bat.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Get or create the cart
        cart, _ = Cart.objects.get_or_create(cart_id = cart_id)
        
        # Ensure the cart has the correct user assigned
        if user and cart.user is None:
            cart.user = user
            cart.save()  #  Save cart with user information
            
         # Get or create the cart item
        cart_item, created = CartItem.objects.get_or_create(
            user=user,
            product=product,
            cart=cart,
            defaults={'quantity': quantity}
        )
        

        if not created:
            cart_item.quantity += quantity
            cart_item.save()        
        print('product:',product,' and quantity:',quantity)
        
        return Response(
            {"message": "Item added to cart", "cart_item": CartItemSerializers(cart_item).data},
            status=status.HTTP_200_OK
        )
        
    @action(detail=False, methods=['get'], url_path='incart',permission_classes=[AllowAny])
    def product_in_cart(self,request):
        cart_id = request.query_params.get('cart_id')
        if not cart_id:
            return Response({"error": "cart_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        product_id = request.query_params.get('product_id')
        
        try:
            cart = Cart.objects.get(cart_id=cart_id)
            product = Bat.objects.get(id=product_id)
            
            product_exist_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
            return Response({"product_in_cart":product_exist_in_cart})
        except Cart.DoesNotExist:
            return Response({"error": "Cart does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    # this function tells you about the cart how many items and what cart_id is been running.
    @action(detail=False, methods=['get'], url_path='status',permission_classes=[AllowAny])
    def get_cart_status(self,request):
        cart_id = request.query_params.get('cart_id')
         # If the request comes from an admin panel, return all carts
        if request.user.is_superuser:  
            carts = Cart.objects.filter(payment = '')
            serializer = SimpleCartSerializer(carts, many=True)
            return Response(serializer.data)
        if not cart_id:
            return Response({"error": "cart_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        cart = Cart.objects.filter(cart_id=cart_id).first()
        if not cart:
            return Response({"error": f"Cart with id {cart_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SimpleCartSerializer(cart)
        return Response(serializer.data)

    
    @action(detail=False, methods=['post'], url_path='placeorder', permission_classes=[IsAuthenticated])
    def place_order(self, request):
        try:
            cart_id = request.data.get('cart_id')
            print('cart_id',cart_id)
            if not cart_id:
                return Response({"error": "Cart ID is required."}, status=400)
            
            cart = Cart.objects.select_for_update().filter(cart_id=cart_id, user=request.user).first()
            print('cart:',cart)
            if not cart:
                return Response({"error": "Cart not found."}, status=404)
        
            cart_items = cart.items.all()  # Get related cart items
            print('cart_items:', cart_items)
            
            if not cart_items.exists():
                return Response({"error": "No items in cart to place an order."}, status=400)
            
            payment = request.data.get('payment','COD')
            txnId = request.data.get('txnId', None)  # Get txnId from request
            print('Payment Method:', payment, "Txn ID:", txnId)
 
            # Validate payment method
            if payment in ['COD','UPI']:
                cart.payment = payment
                print('Validate payemnet:',payment)
                                
                # Store txnId only if payment is 'UPI'
                if payment == 'UPI':
                    if not txnId:
                        return Response({"error": "Transaction ID is required for UPI payment."}, status=400)
                    print('Validate txtId:',txnId)
                    cart.txnId = txnId
                
                cart_items.update(status='Pending')

                cart.save(update_fields=['payment', 'txnId'])
                return Response({"success": "Order placed successfully!"})
            else:
                return Response({"error": "Invalid payment method."}, status=400)
        
        except Exception as e:
            return Response({"error": "Order placement failed.", "details": str(e)}, status=400)

    
    @action(detail=False, methods=['get'], url_path='getcart',permission_classes=[AllowAny]) #when you use detail=True in an action, the URL pattern expects the primary key (pk) of the object you're acting upon to be passed in the URL. 
    def get_cart(self,request):
        cart_id = request.query_params.get('cart_id')
        cart = Cart.objects.filter(cart_id=cart_id).first()
        serializer = CartSerializers(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='cartitems',permission_classes=[AllowAny])
    def view_cart(self, request):
        """Retrieve all cart items for the user."""
        cart_id = request.query_params.get('cart_id')
        if not cart_id:
            return Response({"error": "cart_id is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        # user = request.user if request.user.is_authenticated else None
        try:
            cart = Cart.objects.get(cart_id=cart_id)
            if cart.user is None:
                cart.user = request.user  # Assign the user to the cart
                cart.save()
                
            cart_items = CartItem.objects.filter(cart=cart)
            serializer = CartItemSerializers(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart does not exist"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['patch'], url_path='itemupdate',permission_classes=[AllowAny])
    def update_cart_item(self, request, pk=None):  # Use pk to get cart item ID from URL
        """Update the quantity of a cart item."""
        user = request.user if request.user.is_authenticated else None
        quantity = request.data.get("quantity")
        new_quantity = int(quantity)
        
        cart_id = request.data.get('cart_id')
        
        if not cart_id:
            return Response({"error": "Cart ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create the cart and assign user if not assigned
        cart, _ = Cart.objects.get_or_create(cart_id=cart_id)
        cart.user = user
        cart.save()
        
        cart_item = CartItem.objects.get(id=pk,cart=cart)  # Fetch single object
        if not cart_item:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

         # Ensure the cart item belongs to the cart and update quantity
        if cart_item.cart != cart:
            return Response({"error": "Cart item does not belong to this cart"}, status=status.HTTP_400_BAD_REQUEST)
    
        cart_item.quantity = new_quantity
        cart_item.user = user
        cart_item.save()
        cart.user = user
        cart.save()
        
        return Response({"message": "Cart item updated", "data": CartItemSerializers(cart_item).data}, status=status.HTTP_200_OK)

    
    @action(detail=True, methods=['delete'], url_path='removeitem',permission_classes=[AllowAny])
    def remove_from_cart(self, request, pk=None): # Use pk to get cart item ID from URL
        """Remove a cart item."""
        cart_item = CartItem.objects.filter(id=pk).first() # Fetch single object
        if not cart_item:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)
   
    @action(detail=False, methods=['get'], url_path='useremailinfo', permission_classes=[IsAuthenticated])
    def get_user_email(self, request):
        if not request.user or request.user.is_anonymous:
            return Response({'error': 'User not authenticated'}, status=401)
        cart_id = request.query_params.get("cart_id")  # Get cart_id from request
        cart_updated = False  # Track if cart was updated
        updated_items = 0  # ✅ Always initialize `updated_items`
        if cart_id:
            cart = Cart.objects.filter(cart_id=cart_id).first()
            if cart:
                if cart.user is None:  # Only update if user is None
                    cart.user = request.user
                    cart.save()
                    cart_updated = True  # Mark cart as updated
                # Update all cart items where user is null
                cart_items = CartItem.objects.filter(cart=cart, user__isnull=True)
                for item in cart_items:
                    item.user = request.user
                    item.save()
                    updated_items += 1  # Count updated items

        return Response({
            'email': request.user.email,
            'cart_updated': cart_updated,
            'cart_items_updated': updated_items  # ✅ No more UnboundLocalError!
        })
    @action(detail=False, methods=['post'], url_path='usermessage', permission_classes=[AllowAny])
    def get_user_message(self,request):
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the valid data to the Messages table
            return Response({"message": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



            