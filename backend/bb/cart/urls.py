from django.urls import path,include
from .views import AddToCartModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'Cart',AddToCartModelViewSet,basename='cartList')

urlpatterns = [
    path('',include(router.urls)),
]
