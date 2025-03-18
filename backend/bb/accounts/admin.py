from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'first_name', 'last_name', 'phone_number', 'city','is_staff','is_active','date_joined','last_login']
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "phone_number", "address")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "password1", "password2", "is_staff", "is_active"),
        }),
    )
    list_display_links = ('email','first_name','last_name','phone_number')
    readonly_fields = ('last_login','date_joined')
    ordering = ('date_joined',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(CustomUser, CustomUserAdmin)
    
