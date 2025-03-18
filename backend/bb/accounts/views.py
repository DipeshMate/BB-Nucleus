from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, JWTTokenUserAuthentication
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .authentication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from datetime import timedelta
from django.utils.timezone import now
from .models import CustomUser
from .serializer import UserSerializer, UserRegistrationSerializer, UserAdditionalInfoSerializer, EmailVerificationSerializer, SetNewPasswordSerializer
   

class CustomUserModelViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='userinfo',permission_classes = [IsAuthenticated])
    def get_user_info(self, request):
        user = request.user if request.user.is_authenticated else None
        if not user or user.is_anonymous:
            return Response({'error': 'User not authenticated'}, status=401)
        serializer = UserSerializer(user)  # 🔹 Ensure correct object is passed
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='update-user-info', permission_classes=[IsAuthenticated])
    def update_user_info(self, request):
        """
        Update additional user information at the time of payment.
        URL Path: /Account/update-user-info/
        """
        user = request.user  # Get the currently authenticated user
        serializer = UserAdditionalInfoSerializer(user, data=request.data, partial=True) # partial=True allows updating only the fields provided without affecting the others.
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User Related information updated successfully",
                "user": UserSerializer(user).data
            }, status=200)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['post'], url_path='registeruser', permission_classes=[AllowAny])
    def register_user(self, request):
        """
        Registers a new user.
        URL Path: /Account/registeruser/
        """
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully",
                "user": UserSerializer(user).data
            }, status=201)

        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['post'], url_path='verify-email',permission_classes={AllowAny})
    def verify_email(self, request):
        """ Step 1: Verify if the email exists """
        serializer = EmailVerificationSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Email verified. Proceed to reset password."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='set-new-password',permission_classes={AllowAny})
    def set_new_password(self, request):
        """ Step 2: Set a new password """
        serializer = SetNewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


           
# from cart.models import Cart
# import uuid
# from decimal import Decimal
# import requests 
# import json
# from paytmchecksum import PaytmChecksum

# Paytm_id = 'tkaYb567149262126250'
# Paytm_key= '&VGRrWoFgl@ClukR'

# BASE_URL = "http://localhost:5183"
           
    # @action(detail=False, methods=['post'], url_path='initiatepayment',permission_classes=[IsAuthenticated])
    # def initiate_payment(self, request):
    #     if request.user:
    #         try:
    #             tx_ref = str(uuid.uuid4())  # Unique transaction ID
    #             cart_id = request.data.get("cart_id")
    #             cart = Cart.objects.get(cart_id=cart_id)
    #             user = request.user

    #             # Calculate total amount
    #             amount = sum([item.quantity * item.product.selling_price for item in cart.items.all()])
    #             tax = Decimal("4.00")
    #             total_amount = amount + tax
    #             currency = "INR"

    #             # Store transaction in DB
    #             Transaction.objects.create(
    #                 ref=tx_ref,
    #                 cart=cart,
    #                 amount=total_amount,
    #                 currency=currency,
    #                 user=user,
    #                 status="pending",
    #             )

    #             # ✅ Paytm Payment Request
    #             paytmParams = dict()
    #             paytmParams["body"] = {
    #                     "requestType": "Payment",
    #                     "mid": Paytm_id,
    #                     "websiteName": "WEBSTAGING",  # Change to LIVE when in production
    #                     "orderId": cart_id,
    #                     "callbackUrl": f"{BASE_URL}/PaymentVerification/",
    #                     "txnAmount": {
    #                         "value": str(total_amount),
    #                         "currency": "INR",
    #                     },
    #                     "userInfo": {
    #                         "custId": str(user.email),
    #                     }
                        
    #             }

    #             # Generate Paytm checksum signature
    #             checksum = PaytmChecksum.generateSignature(
    #                 json.dumps(paytmParams["body"]), Paytm_key
    #             )
                
    #             paytmParams["head"] = {"signature": checksum}

    #             # Paytm API URL
    #             paytm_url = f"https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid={Paytm_id}&orderId={cart_id}"
    #             # print(paytm_url)
    #             # Send request to Paytm
    #             response = requests.post(
    #                 paytm_url,
    #                 data=json.dumps(paytmParams),
    #                 headers={"Content-type": "application/json"},
    #             )
    #             print('PAYTM RESPONSE:',response.status_code, response.text)

    #             # Handle Paytm Response
    #             if response.status_code == 200:
    #                 paytm_response = response.json()
    #                 print('PAYTM Response final:',paytm_response) #xxxx response fail
    #                 txn_token = paytm_response["body"].get("txnToken")

    #                 if txn_token:
    #                     payment_page_link = f"https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid={Paytm_id}&orderId={cart_id}&txnToken={txn_token}"
                        
    #                     return Response({"data": {"link": payment_page_link}}, status=200)
    #                 else:
    #                     return Response({"error": "Failed to generate transaction token"}, status=400)
    #             else:
    #                 return Response({"error": "Failed to initiate Paytm payment"}, status=500)

    #         except Exception as e:
    #             return Response({"error": str(e)}, status=500)