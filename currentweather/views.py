# The views page is used to get data from the backend and send it as either JSON data (for a REST API)
# or directly to an HTML page to be
from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
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
    context = {'contextAttribute': '157'}

    return render(request, "templates/templateFile.html", context)


# Get weather data from the weather underground api and display *some* of it. This could be built dynamically with different cities or GPS coordinates.
def getCurrentWeatherJson(request):
    context = {"temperature": 0, "wind_speed": 0, "humidity": 0, "pressure": 0, "desc": "", "location": ""}
    try:
        params = {'q': "Detroit", 'units': 'imperial', 'appid': settings.OPEN_WEATHER_KEY}
        data = requests.get("http://api.openweathermap.org/data/2.5/weather", params=params)

        data = data.json()
        context["temperature"] = data["main"]["temp"]
        context["wind_speed"] = data["wind"]["speed"]
        context["humidity"] = data["main"]["humidity"]
        context["pressure"] = data["main"]["pressure"]
        context["desc"] = data["weather"][0]["main"]
        context["location"] = data["name"]
    except:
        context["error"] = "true"

    return render(request, "templates/currentweather.html", context)
