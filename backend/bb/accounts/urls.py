from django.urls import path,include
from .views import CustomUserModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'Account',CustomUserModelViewSet,basename='userdata')

urlpatterns = [
    path('',include(router.urls)),
]
