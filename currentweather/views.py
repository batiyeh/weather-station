# The views page is used to get data from the backend and send it as either JSON data (for a REST API)
# or directly to an HTML page to be
from django.http import HttpResponse
from django.shortcuts import render
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
    }
    return render(request, "templates/currentweather.html", context)
