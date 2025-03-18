from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from cart.models import Cart

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        extra_fields.setdefault("is_active", True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with elevated permissions."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Custom User Model
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)  # Set email as the primary identifier
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, max_length=100, null=True)
    city = models.CharField(blank=True, max_length=100,null=True)
    pincode = models.CharField(blank=True,max_length=30,null=True)
    state = models.CharField(blank=True, max_length=50,null=True)
    
    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = ["first_name", "last_name"] 

    objects = CustomUserManager() 

    def __str__(self):
        return self.email
  
  
