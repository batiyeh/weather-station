from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('restUrl', views.restUrl, name='restUrl'),
    path('htmlTemplate', views.htmlTemplate, name='htmlTemplate'),
]
