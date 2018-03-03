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

def getApiKey(url):
    keyFile = Path("./.api-key.txt")
    if keyFile.is_file():
        with open('./.api-key.txt', 'r') as f:
            key = f.readline()
        return key

    else:
        verified = False
        while(not verified):
            key = input("Enter your API Key: ")
            key = "".join(key.split())
            try:
                print("Verifying key...")
                r = requests.post(url + '/api/weather/verifyKey', data = {"key": key})
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

<<<<<<< HEAD
def constructWeatherString(weatherdata):
    index = 0
    data = ""
    for val in weatherdata:
        if (index == 0):
            data = data + str(weatherdata[val])
        else:
            data = data + ", " + str(weatherdata[val])
        index += 1
    data = data + "\n"
    return data

def checkDataDirectory():
    dataDir = Path("./data")
    if dataDir.is_dir():
        return True
    else:
        return False

def storeOfflineWeather(weatherdata):
    today = datetime.date.today()
    data = constructWeatherString(weatherdata)
    if(checkDataDirectory()):
        keyFile = Path("./data/" + today.strftime('%d%m%Y') + ".txt")
        if keyFile.is_file():
            with open(keyFile, 'a') as f:
                f.write(data)
        else:
            # with open(keyFile, 'w') as f:
            f = open(keyFile, 'w')
            f.write(data)
            f.close()
            # f.write(data)
    return

def sendOfflineWeather():
    keyFile = Path("./data/.txt")
    if keyFile.is_file():
        with open('./.api-key.txt', 'r') as f:
            key = f.readline()
            return key

    return

if __name__ == '__main__':
    url = "http://localhost:5000"
    temperature = 0
    pressure = 0
    humidity = 0
    apikey = getApiKey(url)
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
                "created_at": datetime.datetime.now(),
                "key": apikey,
                "temperature": temperature,
                "humidity": humidity,
                "pressure": pressure,
                "latitude": latitude,
                "longitude": longitude
            }	

            try:
                r = requests.post(url + '/api/weather', data = weatherdata)
                if (r.status_code == 200):
                    print("Sent: " + json.dumps(weatherdata))
                elif (r.status_code == 400):
                    print("Invalid API key")
            except:
                print("Lost connection to server...storing data locally.")
                storeOfflineWeather(weatherdata)
                pass

            # Wait 3 seconds before restarting the loop
            time.sleep(3)

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")
