import os
import time
import json
import datetime
import sys
import random
import requests
from pathlib import Path
from collections import OrderedDict
from textstorage import TextStorage
try:
    import Adafruit_DHT
except:
    print("Adafruit DHT library not installed.")
    pass
try:
    from sense_hat import SenseHat
except:
    print("Sense Hat library not installed.")
    pass
try:
    from gps3.agps3threaded import AGPS3mechanism
except:
    print("GPS3 library not installed.")
    pass

# Get the API key for server requests
# TODO: Encrypt the key in the file so it is not accessible
def getApiKey(url):
    keyFile = Path(os.path.dirname(os.path.abspath(__file__)) + "/.api-key.txt")

    # If the file already exists read from it
    if keyFile.is_file():
        with open(str(os.path.dirname(os.path.abspath(__file__))) + "/.api-key.txt", 'r') as f:
            key = f.readline()
        return key

    # If the file doesn't exist, ask for user input and verify that the key is usable
    else:
        verified = False
        while(not verified):
            try:
                key = raw_input("Enter your API key: ")
            except:
                key = input("Enter your API key: ")
            key = "".join(key.split())
            try:
                print("Verifying key...")
                r = requests.post(url + '/api/weather/verifyKey', data = {"apikey": key})
                if (r.status_code == 200):
                    print("Key Verified.")
                    f = open(str(os.path.dirname(os.path.abspath(__file__))) + "/.api-key.txt", 'w')
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
    os.environ['TZ'] = 'America/Detroit'
    time.tzset()
    url = "http://localhost:5000"
    temperature = 0
    pressure = 0
    humidity = 0
    pin = 14
    apikey = getApiKey(url)
    textStorage = TextStorage(url)
    
    try:
        # Instantiate GPS data retrieval mechanism
        try:
            agps_thread = AGPS3mechanism()
            agps_thread.stream_data()
            agps_thread.run_thread()
        except:
            pass
        
        try:
            sense = SenseHat()
        except:
            pass
        # Continuously loop
        while True:
            # Try to get latitude and longitude data from our receiver
            try:
                latitude = agps_thread.data_stream.lat
                longitude = agps_thread.data_stream.lon
            except:
                latitude = "n/a"
                longitude = "n/a"
            
            # Attempt to retrieve humidity + temperature
            try:
                humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.AM2302, pin)
                temperature = (9.0/5.0) * temperature + 32
            except:
                temperature = 0.0
                humidity = 0.0

            # Attempt to retrieve from sense hat
            try:
                humidity = sense.humidity
                temperature = (9.0/5.0) * sense.temperature + 32
                pressure = sense.pressure
            except:
                # pass
                temperature = random.uniform(68.0, 78.0)
                humidity = random.uniform(45.0, 55.0)
                pressure = random.uniform(900.0, 1075.0)

            # Construct our weatherdata json object
            weatherdata = OrderedDict()
            weatherdata["created_at"] = str(datetime.datetime.now())
            weatherdata["apikey"] = apikey
            weatherdata["temperature"] = round(temperature, 2)
            weatherdata["humidity"] = round(humidity, 2),
            weatherdata["pressure"] = round(pressure, 2),
            weatherdata["latitude"] = latitude,
            weatherdata["longitude"] = longitude

            try:
                r = requests.post(url + '/api/weather', data = weatherdata)
                if (r.status_code == 200):
                    textStorage.sendWeather()
                    print("Sent: " + json.dumps(weatherdata))
                elif (r.status_code == 400):
                    print("Invalid API key")
            # Exception if unable to connect to server for the post request
            except (requests.exceptions.ConnectionError):
                print("Lost connection to server...storing data locally.")
                textStorage.storeWeather(weatherdata)
                pass

            # Wait 3 seconds before restarting the loop
            time.sleep(5)

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")