from django.db import models
from django.core.validators import RegexValidator
# from django.urls import reverse
# Create your models here.

# class Category(models.Model):
#     category_name = models.CharField(max_length=50)
#     slug = models.SlugField(max_length=100, unique=True) # this will help in selecting the categories
#     description = models.TextField(max_length=255, blank=True)

#     class Meta:
#         verbose_name = 'category'
#         verbose_name_plural = 'categories'

#     # def get_url(self):
#     #     return reverse('Bats_by_category', args=[self.slug])

#     def __str__(self):
#         return self.category_name
    
class Bat(models.Model):
    name = models.CharField(max_length=100,unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    desc = models.TextField(null=True)
    company = models.CharField(max_length=10)
    bat_types = [('Hard Tennis Bats', 'HardTennisBats'), ('Soft Tennis Bats', 'SoftTennisBats'), ('Custom Bats', 'CustomBats'),]
    types = models.CharField(max_length=40, choices=bat_types, default=None)
    og_price = models.DecimalField(max_digits=4,decimal_places=0)
    discount_percentage = models.IntegerField(default=0)
    discounted_price = models.IntegerField(default=0)
    selling_price = models.IntegerField(null=True)
    size = models.DecimalField(max_digits=3,decimal_places=0)
    units = [('Grams','grams'),('Kilograms','kilograms')]
    weight_value = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    weight_unit = models.CharField(max_length=10, choices=units, default='grams')    
    image = models.ImageField(null=True, blank=True,default='default.png',upload_to='bats/images/uploads')
    stock = models.IntegerField()
    is_available = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    
    
    @property
    def discounted_price(self):
        return ((self.og_price)*(self.discount_percentage))/100
    
    @property
    def selling_price(self):
        return (self.og_price)-(self.discounted_price)
    
    class Meta:
        verbose_name = 'Bat'
        verbose_name_plural = 'Bats'
    
    def __str__(self):
        return f"{self.name}"
    
class BatGallery(models.Model):
    bat = models.ForeignKey(Bat, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='bats/images/Bats/', max_length=255)
    
    def __str__(self):
        return self.bat.name
    
    class Meta:
        verbose_name = 'batgallery'
        verbose_name_plural = 'batgallery'