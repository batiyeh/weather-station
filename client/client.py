import requests
import time
import json
import datetime

station_name = "Base Station"
mac_address = "00:00:00:00:00:00"
temperature = 0
pressure = 0
humidity = 0

while True:
    temperature += 5
    pressure += 5
    humidity += 5

    weatherdata = {
        "updated_at": str(datetime.datetime.now()),
        "station_name": station_name,
        "mac_address": mac_address,
        "temperature": temperature,
        "pressure": pressure,
        "humidity": humidity,
        "connected": 1	
    }	

    print("Sending: " + json.dumps(weatherdata))

    # Send a json object to be inserted into our database asynchronously
    r = requests.post('http://localhost:5000/api/stations/', data = weatherdata)	

    time.sleep(3)