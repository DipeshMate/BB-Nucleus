from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import CustomUser
from cart.serializer import CartItem,Cart, NewCartItemSerializer, CartSerializers

User = get_user_model()
# for user profile info
class UserSerializer(serializers.ModelSerializer): # django custom user model
    items = serializers.SerializerMethodField()
    fullname = serializers.SerializerMethodField()
    cart = serializers.SerializerMethodField()
    date_joined = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id','items','cart','email','first_name','last_name','fullname','phone_number','address','city','pincode','state','last_login','date_joined']
        
    def validate_phone_number(self, value):
        if value and not value.isdigit():
          raise serializers.ValidationError("Phone number must contain only digits.")
        return value
    
    def get_fullname(self,user):
        return f"{user.first_name} {user.last_name}".strip()
    def get_date_joined(self, user):
        return user.date_joined.strftime("%Y-%m-%d") if user.date_joined else None  
    
    # this is for order items by users
    def get_items(self, user):
        try:
            cart_items = CartItem.objects.filter(
                cart__user=user,cart__payment__in=['COD', 'UPI'],
            status__in=['Pending', 'Shipped', 'Out for Delivery', 'Delivered','Cancelled']) #[:10]  # this will display only when paid= true and user=user
            serializer = NewCartItemSerializer(cart_items, many=True)
            return serializer.data
        except CartItem.DoesNotExist:
            return []  # Return empty list if no cart items found
    def get_cart(self, user):
        """Fetch user's cart with items"""
        cart = Cart.objects.filter(user=user).first()
        if cart:
            return CartSerializers(cart).data
        return None
    
    
# this serializer is for user registration
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)  #Explicitly define password2
    class Meta:
        model = get_user_model()
        fields = ["id", "first_name", "last_name","email","password","password2",
                  "phone_number", "address", "city", "pincode", "state"
                  ]
        extra_kwargs = {
            'password': {'write_only': True} 
        }
    def validate(self, data):
        """Ensure password and password2 match"""
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  #  Remove password2 before creating user
        user = get_user_model().objects.create_user(**validated_data)  # Properly create user
        user.is_staff = True
        user.save()
        return user

class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value

class SetNewPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def save(self):
        user = User.objects.get(email=self.validated_data["email"])
        user.password = make_password(self.validated_data["new_password"])
        user.save()
        return user



# update only the required fields in CUSTOMUSER.
# serializers.py
class UserAdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name','phone_number', 'address', 'city', 'pincode', 'state']

    def update(self, instance, validated_data):
        # Update the additional fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.city = validated_data.get('city', instance.city)
        instance.pincode = validated_data.get('pincode', instance.pincode)
        instance.state = validated_data.get('state', instance.state)
        instance.save()
        return instance
