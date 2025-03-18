
from pathlib import Path
from datetime import timedelta
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# dungeonmaster@gmail.com
# admin321

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-uw+mv6kgu())+uk1@x)(_=xv%5bstd*dlw@#^#y(aiw=^pt@3d'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


AUTH_USER_MODEL = 'accounts.CustomUser'


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bats',
    'accounts',
    'cart',
    'corsheaders',
    'rest_framework',
]


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'bb.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bb.wsgi.application'



# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

MEDIA_URL = '/media/'  # The base URL for media files
MEDIA_ROOT = BASE_DIR/ 'media' # Where media files are stored on the server

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
   'DEFAULT_AUTHENTICATION_CLASSES': (
       'rest_framework_simplejwt.authentication.JWTAuthentication',
       'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        # 'accounts.authentication.CookieJWTAuthentication',  # Custom authentication
   ),
   'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
   ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
    # 'SIGNING_KEY': SECRET_KEY,  # 🔹 Ensure this key is defined!
   
    # # ✅ These settings are required for setting cookies properly
    # 'AUTH_COOKIE': 'access_token',  
    # 'AUTH_COOKIE_REFRESH': 'refresh_token',
    
    #  # 🔹 Cookie Settings
    # 'AUTH_COOKIE_HTTP_ONLY': True,  
    # 'AUTH_COOKIE_SECURE': False,  # Set True in production (HTTPS required)
    # 'AUTH_COOKIE_PATH': '/',
    # 'AUTH_COOKIE_SAMESITE': 'Lax',  # Change to 'None' if using cross-origin requests
}


CORS_ALLOWED_ORIGINS = [
    "http://localhost:5183",
    "http://127.0.0.1:8989",
]
# CORS_ALLOW_ALL_ORIGINS = True  # ⚠️ Remove this in production!

# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOW_HEADERS = ["Authorization", "Content-Type", "X-CSRFToken"]
# CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
# CORS_EXPOSE_HEADERS = ["Set-Cookie"]  # ✅ Allows browser to see cookies

# CSRF_TRUSTED_ORIGINS = [
#     "http://localhost:3000  ",
#     "http://127.0.0.1:8000",
# ]
# CSRF_COOKIE_HTTPONLY = False
# CSRF_COOKIE_SECURE = False # Set False in development
# CSRF_COOKIE_SAMESITE = 'Lax'


# # Custom setting to control cookie security
# JWT_COOKIE_SECURE = False  # Set True for production (HTTPS)
# SESSION_COOKIE_SECURE = False
# # JWT_COOKIE_SECURE = True  # Ensure JWT cookies are secure