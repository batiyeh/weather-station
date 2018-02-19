import os
import requests
import time
import json
import datetime
import netifaces
from gps3.agps3threaded import AGPS3mechanism

def getMacAddress():
    interfaces = netifaces.interfaces()

    try:
        if ("eth0" in interfaces):
            mac_address = netifaces.ifaddresses('eth0')[netifaces.AF_LINK]
        else:
            mac_address = "00:00:00:00:00:00" 

    except:
        mac_address = "00:00:00:00:00:00" 

    return mac_address[0]['addr']

if __name__ == '__main__':
    mac_address = getMacAddress()
    temperature = 0
    pressure = 0
    humidity = 0
    
    try:
        # Instantiate GPS data retrieval mechanism
        agps_thread = AGPS3mechanism()
        agps_thread.stream_data()
        agps_thread.run_thread()

        # Continuously loop
        while True:
            latitude = agps_thread.data_stream.lat
            longitude = agps_thread.data_stream.lon
            temperature += 5
            pressure += 5
            humidity += 5

            weatherdata = {
                "updated_at": str(datetime.datetime.now()),
                "latitude": latitude,
                "longitude": longitude,
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

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")
