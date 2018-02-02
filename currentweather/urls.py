from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('restUrl', views.restUrl, name='restUrl'),
    path('htmlTemplate', views.htmlTemplate, name='htmlTemplate'),
    path('currentweather', views.getCurrentWeatherJson, name='currentWeather'),
    path('testAlert', views.testAlert, name='testAlert'),
    path('random', views.randomPage, name='random'),
    path('randomNum', views.randomNum,name='randomNum'),
    path('auth/', include('django.contrib.auth.urls')),
    # path('login', views.login, name='login'),
    # path('newAccount', views.newAccount, name='newAccount'),
    # path('create', views.createUser),
    # path('verifyLogin',views.verifyLogin),
]
