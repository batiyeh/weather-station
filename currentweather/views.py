# The views page is used to get data from the backend and send it as either JSON data (for a REST API)
# or directly to an HTML page to be
from django.http import HttpResponse
from django.shortcuts import render
from dj_twilio_sms import utils
from dj_twilio_sms.models import OutgoingSMS
from sendsms.message import SmsMessage
from sendsms import api
from django.core.mail import send_mail
import json
import requests


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


# Get weather data from the weather underground api and display *some* of it. This could be built dynamically with different cities or GPS coordinates. We will probably have to build a model to store data from this
def getCurrentWeatherJson(request):
    data = requests.get("http://api.wunderground.com/api/ec938655f8fd9257/conditions/q/MI/Detroit.json")
    data = data.json()

    context = {
        "temperature": data["current_observation"]["temp_f"],
        "wind_speed": data["current_observation"]["wind_mph"],
        "humidity": data["current_observation"]["relative_humidity"], # Percentage
        "pressure": data["current_observation"]["pressure_mb"], # In millobars
        "Last_rec": data["current_observation"]["observation_time"],
    }
    return render(request, "templates/currentweather.html", context)

def testAlert(request):
    #api.send_sms(body='I can haz txt', from_phone='+2488800626', to=['+2488800626'])
    #message = SmsMessage(body='lolcats make me hungry', from_phone='+41791111111', to=['+41791234567'])
    #message.send()
   # result = utils.send_sms(
    #    request=None,
     #   to_number='+2488800626',
      #  body='Test Message from tox'
    #)
    #self.assertTrue(isinstance(result, OutgoingSMS))
    #!usr/bin/python2.7

    #api.send_sms(body='I can haz txt', from_phone='+2488800626', to=['+2488800626'])

    send_mail(
        'Weather Alert!',
        'The Weather is BAD!',
        'WStationTestdod@gmail.com',
        ['tmalarkey14@gmail.com'],
        fail_silently=False,
    )
    return render(request, "templates/testAlert.html")

