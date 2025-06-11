from pathlib import Path

# Caminho base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# Chave secreta (não usar essa em produção)
SECRET_KEY = 'django-insecure-r6no2m@r-1*@$mx_c%if*si7vs62aqs$$h-86zkmcuy0mvbr-q'

# Modo debug ligado (somente para testes)
DEBUG = True

ALLOWED_HOSTS = []

# Aplicações instaladas
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',           # Django REST Framework
    'corsheaders',              # Permitir chamadas externas (CORS)
    'todo_app',                 # A tua app principal
]

# Middleware (inclui CORS no início)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # IMPORTANTE: precisa vir antes do CommonMiddleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Ativa CORS para todas as origens (apenas para desenvolvimento local)
CORS_ALLOW_ALL_ORIGINS = True

# Configuração de URLs
ROOT_URLCONF = 'todo_project.urls'

# Configuração dos templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Aqui podes pôr o caminho de templates, se quiseres
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'todo_project.wsgi.application'

# Base de dados SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Validação de senha (opcional durante testes)
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

# Idioma e fuso horário
LANGUAGE_CODE = 'pt-pt'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Ficheiros estáticos (CSS, JS, imagens)
STATIC_URL = 'static/'

# Tipo de chave primária padrão
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
