import os
import requests
import time
import json
import datetime
import netifaces
try:
    from gps3.agps3threaded import AGPS3mechanism
except:
    pass

# Gets the ethernet0 mac address from the network interfaces
# If it cannot find it, it will default to all 0s
def getMacAddress():
    interfaces = netifaces.interfaces()

    try:
        if ("eth0" in interfaces):
            mac_address = netifaces.ifaddresses('eth0')[netifaces.AF_LINK][0]['addr']
        else:
            mac_address = "01:00:00:00:00:00" 

    except:
        mac_address = "00:00:00:00:00:00" 

    return mac_address

if __name__ == '__main__':
    mac_address = getMacAddress()
    temperature = 0
    pressure = 0
    humidity = 0
    
    try:
        # Instantiate GPS data retrieval mechanism
        try:
            agps_thread = AGPS3mechanism()
            agps_thread.stream_data()
            agps_thread.run_thread()
        except:
            pass

        # Continuously loop
        while True:
            # Try to get latitude and longitude data from our receiver
            try:
                latitude = agps_thread.data_stream.lat
                longitude = agps_thread.data_stream.lon
            # For running from a laptop and we just need fake data
            except:
                latitude = "n/a"
                longitude = "n/a"

            temperature += 5
            pressure += 5
            humidity += 5

            # Construct our weatherdata json object
            weatherdata = {
                "updated_at": str(datetime.datetime.now()),
                "latitude": latitude,
                "longitude": longitude,
                "mac_address": mac_address,
                "temperature": temperature,
                "pressure": pressure,
                "humidity": humidity,
                "connected": 1	
            }	

            print("Sending: " + json.dumps(weatherdata))

            # Send a json object to be inserted into our database
            r = requests.post('http://localhost:5000/api/stations/', data = weatherdata)	

            # Wait 3 seconds before restarting the loop
            time.sleep(3)

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")