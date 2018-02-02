# The views page is used to get data from the backend and send it as either JSON data (for a REST API)
# or directly to an HTML page to be

from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
<<<<<<< Updated upstream

import json
import requests
from . import models

=======
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned
import json
import requests
from currentweather.models import UserAccount
>>>>>>> Stashed changes

# This is an example of a RESTful API endpoint
def restUrl(request):
    # if request.GET:
    # Select data from database and construct dictionary, test json dictionary below
    response = {'attribute1': 'TestData', 'attribute2': 'MoreTestData'}

    # if request.POST:
    # Insert/Update/Delete data from database here

    # Return either a HttpResponse that contains your json data
    # or just a HttpResponse with a success (200) code if you were doing insert/update/delete
    return HttpResponse(json.dumps(response), content_type='application/json')


# This is an example of an HTML file being served to display data
def htmlTemplate(request):
    # Select data from database up here if you want and build a context dictionary
    context = {'contextAttribute': '1414', 'someStuff': 'Testing'}

    return render(request, "templates/templateFile.html", context)


# Get weather data from the weather underground api and display *some* of it. This could be built dynamically with different cities or GPS coordinates.
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

        q = Weather(temperature = 'data["main"]["temp"]',wind_speed = data["wind"]["speed"], humidity = data["main"]["humidity"], pressure = data["main"]["pressure"] )
        q.save()

    except:
        # TODO: Check for this in the currentWeather template and display an error on that page.
        context["error"] = "true"


    return render(request, "templates/currentweather.html", context)


# Sends a test email to Trevor's email
def testAlert(request):
    response = {'success': 'email sent'}
    send_mail(
        'Weather Alert!',
        'The Weather is BAD!',
        'WStationTestdod@gmail.com',
        ['tmalarkey14@gmail.com'],
        fail_silently=False,
    )
    return HttpResponse(json.dumps(response), content_type='application/json', status=200)


def login(request):
    return render(request, "templates/login.html")

def newAccount(request):
    return render(request, "templates/newAccount.html")

def createUser(request):
    if request.method == 'POST':
        email = request.POST['email']
        phone = request.POST['phone']
        password = request.POST['password']

        try:
            UserAccount.objects.get(email=email, phone=phone)
        except ObjectDoesNotExist:
            UserAccount.objects.create(
                userid = None,
                email = email,
                phone = phone,
                password = password
            )
            return HttpResponse(json.dumps({'success': 'Successfully created account'}), content_type='application/json', status=200)
        
    return HttpResponse(json.dumpsd({'error': 'Failed to create account'}), content_type='application/json', status=500)
        #         print("Invalid Phone number")
        #         return HttpResponse('')

        #     print("Invalid Email")
        #     return HttpResponse('')

        # print("Invalid Username")
        # return HttpResponse('')

def verifyLogin(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            UserAccount.objects.get(email=email, password=password)
        except ObjectDoesNotExist:
            return HttpResponse(json.dumps({'error': 'Incorrect login information'}), content_type='application/json', status=500)
            #return HttpResponse(json.dumps({‘error’: ‘no rows given.’}), content_type=‘application/json’, status=500)
        except MultipleObjectsReturned:
            return HttpResponse(json.dumps({'error': 'Database is broken'}), content_type='application/json', status=500)
        
        return HttpResponse(json.dumps({'success': 'User has logged in'}), content_type='application/json', status=200)
        # try:
        #     u = UserAccount.objects.get(name=name)
        # except ObjectDoesNotExist:
        #     print("Incorrect login information")
        #     return HttpResponse('')
        # except MultipleObjectsReturned:
        #     print("Error in database, duplicate user names not allowed")
        #     return HttpResponse('')
        
        # try:
        #     p = UserAccount.objects.get(password=password)
        # except ObjectDoesNotExist:
        #     print("Incorrect login information")
        #     return HttpResponse('')
        # except MultipleObjectsReturned:
        #     print("Incorrect login information")
        #     return HttpResponse('')
        
        # if(u==p):
        #     print("User has logged in")
        #     return HttpResponse('')
        # else:
        #     print("Incorrect login information")
        #     return HttpResponse('')
