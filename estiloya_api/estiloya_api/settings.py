import os
from pathlib import Path
import dj_database_url

# -----------------------
# Paths
# -----------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# -----------------------
# Security
# -----------------------
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
DEBUG = 'RENDER' not in os.environ

# -----------------------
# Hosts
# -----------------------
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']
if os.getenv('RENDER_EXTERNAL_HOSTNAME'):
    ALLOWED_HOSTS.append(os.environ['RENDER_EXTERNAL_HOSTNAME'])

# -----------------------
# Applications
# -----------------------
INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    # Tu app
    "store",
]

# -----------------------
# Middleware
# -----------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",         # WhiteNoise para estáticos
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# -----------------------
# CORS
# -----------------------
CORS_ALLOW_ALL_ORIGINS = True

# -----------------------
# REST Framework
# -----------------------
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}

# -----------------------
# URLs & WSGI
# -----------------------
ROOT_URLCONF = 'estiloya_api.urls'
WSGI_APPLICATION = 'estiloya_api.wsgi.application'

# -----------------------
# Database
# -----------------------
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///' + str(BASE_DIR / 'db.sqlite3'),
        conn_max_age=600,
        ssl_require=not DEBUG,
    )
}

# -----------------------
# Templates
# -----------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # si tienes plantillas fuera de las apps, añádelas aquí
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

# -----------------------
# Password validation
# -----------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# -----------------------
# Internationalization
# -----------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/Lima'
USE_I18N = True
USE_TZ = True

# -----------------------
# Static files
# -----------------------
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# -----------------------
# Default primary key
# -----------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
