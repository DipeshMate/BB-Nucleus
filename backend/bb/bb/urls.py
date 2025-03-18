
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
 
# simple JWT gives you Logged in user access token & refresh token
# from accounts.views import CookieTokenObtainPairView, CookieTokenRefreshView

urlpatterns = [
    # path('admin/',include('admin_honeypot.urls', name='admin_honeypot')),
    path('mysecurelogin/', admin.site.urls),
    path('',include('bats.urls')),
    path('',include('cart.urls')),
    path('',include('accounts.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # it will generate access & refresh token 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # and it will generate new access token it user session get expired
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
