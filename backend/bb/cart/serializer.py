from rest_framework import serializers
from .models import Cart, CartItem , Messages
from bats.serializer import BatSerializers

class CartItemSerializers(serializers.ModelSerializer):
    product = BatSerializers(read_only=True)
    user = serializers.CharField(source='CartItem.user.email', read_only=True)  # Display email instead of ID
    cart = serializers.PrimaryKeyRelatedField(read_only = True)
    total = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ['id','cart','user','product','quantity','status','remarks','total']
        depth = 1
    def get_total(self,cartitem):
        selling_price = cartitem.product.selling_price * cartitem.quantity
        return selling_price
    

class CartSerializers(serializers.ModelSerializer):
    items = CartItemSerializers(read_only=True, many=True)
    tax = serializers.SerializerMethodField()
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    sum_original_price = serializers.SerializerMethodField()
    sum_discounted_price = serializers.SerializerMethodField()
    user = serializers.CharField(source='CartItem.user.email', read_only=True)  # Display email instead of ID

    class Meta:
        model = Cart
        fields = ['id','user','cart_id','items','payment','created_at','modified_at','num_of_items','sum_original_price','sum_discounted_price','sum_total', 'tax']
    
    def get_sum_original_price(self,cart):
        items = cart.items.all()
        total = sum([item.product.og_price * item.quantity for item in items])
        return total
    
    def get_sum_discounted_price(self,cart):
        items = cart.items.all()
        total = sum([item.product.discounted_price * item.quantity for item in items])
        return total
        
    def get_num_of_items(self,cart):
        items = cart.items.all()
        total = sum([item.quantity for item in items])
        return total
    def get_sum_total(self,cart):
        items = cart.items.all()
        total = sum([item.product.selling_price * item.quantity for item in items])
        tax = (total *2)/100  # 2% tax
        return total + tax # Return final total including tax
    
    def get_tax(self,cart):
        items = cart.items.all()
        total = sum([item.product.selling_price * item.quantity for item in items])
        tax = (total *2)/100  # 2% tax
        return tax



# to know the homepage cart Items , 
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
       model = Cart
       fields = ["id", "cart_id", "num_of_items"]

    def get_num_of_items(self, cart):
        num_of_items = sum([item.quantity for item in cart.items.all() ])
        return num_of_items
    
# displaying in profile what type of product is purchased by the user.
class NewCartItemSerializer(serializers.ModelSerializer):
    product = BatSerializers(read_only=True)
    status = serializers.SerializerMethodField()
    remarks = serializers.SerializerMethodField()
    payment = serializers.SerializerMethodField()
    delivery_date = serializers.SerializerMethodField()
    order_id = serializers.SerializerMethodField() # custom fields
    order_date = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ["id", "product","quantity","status","remarks","delivery_date","payment","total", "order_id", "order_date"]

    def get_order_id(self, cartitem):
        order_id = cartitem.cart.cart_id
        return order_id

    def get_order_date(self, cartitem):
        order_date = cartitem.cart.modified_at.strftime("%Y-%B-%d")
        print(order_date)
        return order_date
    
    def get_status(self,cartitem):
        return cartitem.status
    
    def get_remarks(self,cartitem):
        return cartitem.remarks
    
    def get_payment(self,cartitem):
        return cartitem.cart.payment
    
    def get_delivery_date(self,cartitem):
        return cartitem.delivery_date
    
    
class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields= ["name","email","phone","message"]