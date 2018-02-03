from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('currentweather/', views.getCurrentWeatherJson, name='currentweather'),
    path('testAlert/', views.testAlert, name='testAlert'),
    path('random/', views.randomPage, name='random'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/create/', views.createUser, name='createUser'),
    path('api/stationListener/', views.stationListener, name='stationListener')
]
