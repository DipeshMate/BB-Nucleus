from django import forms
from .models import Bat

class BatForm(forms.ModelForm):
    class Meta:
        model = Bat
        fields = ['id','name','desc','logo','og_price','discount_percentage','discounted_price','selling_price','size','weight_value','weight_unit']