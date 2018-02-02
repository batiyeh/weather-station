from django.contrib import admin
from .models import ApiWeather
from .models import StationWeather
# Register your models here.

admin.site.register(ApiWeather)
admin.site.register(StationWeather)
