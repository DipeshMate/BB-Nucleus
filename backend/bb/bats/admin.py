from django.contrib import admin
from .models import Bat, BatGallery
import admin_thumbnails
from django.utils.html import format_html


@admin_thumbnails.thumbnail('image')
class BatGalleryInline(admin.TabularInline):
    model = BatGallery
    extra = 1

@admin_thumbnails.thumbnail('image')    
class BatsDetail(admin.ModelAdmin):
    model = Bat
    list_display = ('id','name','desc','types','og_price','discount_percentage','discounted_price','selling_price','size','weight_value','weight_unit','is_available','stock','created_date','modified_date','image')
    list_display_links=('name','types','image')
    ordering=('name',)
    prepopulated_fields = {'slug':('name',)}
    inlines = [BatGalleryInline]
    
    # def image_preview(self, obj):
    #     if obj.image:
    #         return format_html('<img src="{}" width="100" height="100" style="border-radius: 5px;"/>', obj.image.url)
    #     return "No Image"

    # image_preview.short_description = "Image Preview"

    # readonly_fields = ('image_preview',)

    
admin.site.register(Bat,BatsDetail)
admin.site.register(BatGallery)


