from django.db import models
from bats.models import Bat
# Create your models here.

class Cart(models.Model):
    cart_id = models.CharField(max_length=11,unique=True)
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE,null=True,blank=True)
      
    PAYMENT_METHOD = (
        ('COD', 'COD'),
        ('UPI', 'UPI'),
    )
    payment = models.CharField(max_length=16, choices=PAYMENT_METHOD,default='',null=True, blank=True)
    txnId = models.CharField(max_length=50,null=True, blank= True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    modified_at = models.DateTimeField(auto_now=True,blank=True,null=True)
    # def is_order_placed(self):
    #     return self.status in ['Pending', 'Shipped', 'Out for Delivery', 'Delivered','Cancelled']
    
    def __str__(self):
        return self.cart_id


class CartItem(models.Model):
    cart    = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE,null=True)
    product = models.ForeignKey(Bat, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total = models.IntegerField(default=0)
    STATUS_MODE = (
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_MODE, default='',null=True,blank=True)
    remarks = models.CharField(max_length=200, null=True, blank=True)  # New field for individual product remarks
    delivery_date = models.DateField(null=True, blank=True, verbose_name="Delivery Date")


    def total(self):
        return self.product.selling_price * self.quantity

    def __unicode__(self):
        return self.product
    
    def __str__(self):
        return f'{self.quantity} x {self.product.selling_price} in cart {self.cart.id}'
    

class Messages(models.Model):
    name = models.CharField(max_length=30,blank= True, null=True)
    email = models.EmailField(unique=True) 
    phone = models.CharField(max_length=15, blank=True, null=True)
    message = models.TextField(blank=True, max_length=500, null=True)
    
    def __str__(self):
        return self.message