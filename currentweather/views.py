# The views page is used to get data from the backend and send it as either JSON data (for a REST API)
# or directly to an HTML page to be

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from currentweather.models import ApiWeather

import json
import requests
import random

# Get weather data from the weather underground api and display *some* of it. This could be built dynamically with different cities or GPS coordinates.
@login_required
def getCurrentWeatherJson(request):
    context = {"temperature": 0, "wind_speed": 0, "humidity": 0, "pressure": 0, "desc": "", "location": ""}
    try:
        params = {'q': "Detroit", 'units': 'imperial', 'appid': settings.OPEN_WEATHER_KEY}
        # Obtains the data from the openweathermap API. The params option puts the request into the form
        # http://api.openweathermap.org/data/2.5/weather?q=Detroit&units=imperial&appid=key
        data = requests.get("http://api.openweathermap.org/data/2.5/weather", params=params)

        # Convert the received data into a json object and store the values we received
        data = data.json()
        context["temperature"] = data["main"]["temp"]
        context["wind_speed"] = data["wind"]["speed"]
        context["humidity"] = data["main"]["humidity"]
        context["pressure"] = data["main"]["pressure"]
        context["desc"] = data["weather"][0]["main"]
        context["location"] = data["name"]

        q = ApiWeather(temperature = data["main"]["temp"], wind_speed = data["wind"]["speed"], humidity = data["main"]["humidity"],     pressure = data["main"]["pressure"] )
        q.save()

    except:
        # TODO: Check for this in the currentWeather template and display an error on that page.
        context["error"] = "true"


    return render(request, "templates/currentweather.html", context)


# Sends a test email to Trevor's email
def testAlert(request):
    response = {'success': 'email sent'}
    if request.user.is_authenticated:
        email = request.user.email
    send_mail(
        'Weather Alert!',
        'The Weather is BAD!',
        'WStationTestdod@gmail.com',
        [email],
        fail_silently=False,
    )
    return HttpResponse(json.dumps(response), content_type='application/json', status=200)

# View to create a user account and redirect to the login page
def createUser(request):
    # Displays the create account template when just being directed by URL
    if request.method == 'GET':
        return render(request, "templates/registration/create.html")
    
    # This actually creates the account after clicking the create account button
    if request.method == 'POST':
        username = request.POST.get('username', None)
        email = request.POST.get('email', None)
        # phone = request.POST.get('phone')
        password = request.POST.get('password', None)

        try:
            user = User.objects.create_user(username=username, email=email,
                                            password=password)
            user.save()
        except:
            return HttpResponse(json.dumps({'error': 'Failed to create account'}), content_type='application/json', status=500)

        return HttpResponseRedirect("/accounts/login/")

def randomPage(request):
    if request.method == 'GET':
        return render(request, "rng.html")

    elif request.is_ajax():
        return JsonResponse({"one":random.randint(1,101), "two":random.randint(1,101)})

@csrf_exempt
def stationListener(request):
    if request.method == 'GET':
        return HttpResponse(json.dumps({'success': 'you are at the listener page'}), content_type='application/json', status=200)

    if request.method == 'POST':
        q = StationWeather(stationid = request.POST.get('stationid', None), temperature = request.POST.get('temperature', None), humidity = request.POST.get('temperature', None),     pressure = request.POST.get('pressure', None) )
        q.save()

        response = {'success': 'received data'}
        return HttpResponse(json.dumps(response), content_type='application/json', status=200)