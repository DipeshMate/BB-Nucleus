from django.contrib import admin
from .models import Cart, CartItem, Messages

# Register your models here.

class CartAdmin(admin.ModelAdmin):
    list_display = ('user','cart_id','payment','txnId','created_at','modified_at')
    list_display_links = ('user','cart_id','payment')

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user','product','quantity','status','remarks','delivery_date','cart','total')
    list_display_links = ('user','product','status','delivery_date','remarks')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('name','email','phone','message')
    list_display_links = ('message',)

    
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Messages, MessageAdmin)
