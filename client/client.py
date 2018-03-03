import os
import requests
import time
import json
import datetime
from pathlib import Path
try:
    import Adafruit_DHT
except:
    pass
try:
    from gps3.agps3threaded import AGPS3mechanism
except:
    pass

def getApiKey():
    keyFile = Path("./.api-key.txt")
    if keyFile.is_file():
        with open('./.api-key.txt', 'r') as f:
            key = f.readline()
            return key
    else:
        verified = False
        while(not verified):
            key = input("Enter your API Key: ")
            try:
                print("Verifying key...")
                r = requests.post('http://localhost:5000/api/weather/verifyKey', data = {"key": key})
                if (r.status_code == 200):
                    print("Key Verified.")
                    f = open('./.api-key.txt', 'w')
                    f.write(key)
                    f.close()
                    verified = True
                elif (r.status_code == 400):
                    print("Invalid API key. Please try again.")
                else:
                    print("Something went wrong with the server.")
            except:
                print("Lost connection to server.")
                pass

    return key


if __name__ == '__main__':
    temperature = 0
    pressure = 0
    humidity = 0
    apikey = getApiKey()
    pin = 14
    
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
            
            # Attempt to retrieve humidity + temperature
            try:
                humidity, temperature = Adafruit_DHT.read(Adafruit_DHT.AM2302, pin)
            except:
                temperature += 5
                humidity += 5

            pressure += 5

            # Construct our weatherdata json object
            weatherdata = {
                "key": apikey,
                "latitude": latitude,
                "longitude": longitude,
                "temperature": temperature,
                "pressure": pressure,
                "humidity": humidity
            }	

            try:
                r = requests.post('http://localhost:5000/api/weather/', data = weatherdata)
                if (r.status_code == 200):
                    print("Sent: " + json.dumps(weatherdata))
                elif (r.status_code == 400):
                    print("Invalid API key")
            except:
                print("Lost connection to server...attemping reconnect.")
                pass

            # Wait 3 seconds before restarting the loop
            time.sleep(3)

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")
