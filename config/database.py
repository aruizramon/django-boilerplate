import os

# Future: os.environ.get('DB') ?
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'klaviyo_weather_app',
        'USER': 'klaviyo_weather_app',
        'PASSWORD': 'klaviyo-weather-app',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
