from rest_framework import serializers
from.models import Bat, BatGallery

class BatGallerySerializer(serializers.ModelSerializer):
    """Serializer to return bat gallery images."""
    class Meta:
        model = BatGallery
        fields = ['id', 'image']


class BatSerializers(serializers.ModelSerializer):
    """Serializer to return bat details along with images."""
    images = BatGallerySerializer(source="batgallery_set", many=True, read_only=True)

    class Meta:
        model = Bat
        fields = ['id','name','desc','types','og_price','discount_percentage','discounted_price','selling_price','size','weight_value','weight_unit','is_available','stock','image','images']
    
    