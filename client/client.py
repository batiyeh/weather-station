import requests
import time
import json
import datetime
import netifaces

def sendData():
    station_name = "Base Station"
    mac_address = getMacAddress()
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

        # print("Sending: " + json.dumps(weatherdata))

        # Send a json object to be inserted into our database asynchronously
        r = requests.post('http://localhost:5000/api/stations/', data = weatherdata)	

        time.sleep(3)

def getMacAddress():
    interfaces = netifaces.interfaces()
    try:
        if ("lo0" in interfaces):
            mac_address = netifaces.ifaddresses('lo0')[netifaces.AF_LINK]
        elif ("lo" in interfaces):
            mac_address = netifaces.ifaddresses('lo')[netifaces.AF_LINK]
        elif ("eth0" in interfaces):
            mac_address = netifaces.ifaddresses('eth0')[netifaces.AF_LINK]
        else:
            mac_address = "00:00:00:00:00:00" 

    except:
        mac_address = "00:00:00:00:00:00" 

    print(mac_address)
    return mac_address


sendData()