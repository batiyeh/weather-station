
# TODO Refactor code into a file wrapper class and a sensor data class
import os
import requests
import time
import json
import datetime
import sys
from collections import OrderedDict
import random
from pathlib import Path
try:
    import Adafruit_DHT
except:
    pass
try:
    from sense_hat import SenseHat
except:
    pass
try:
    from gps3.agps3threaded import AGPS3mechanism
except:
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
            key = input("Enter your API Key: ")
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

# Constuct our string of weather data to be printed into the file
def constructWeatherString(weatherdata):
    index = 0
    data = ""
    for val in weatherdata:
        if (index == 0):
            data = data + str(weatherdata[val]).replace('(', '').replace(')', '')
        else:
            data = data + ", " + str(weatherdata[val]).replace('(', '').replace(')', '').replace(',', '').replace('\'', '')
        index += 1
    data = data + "\n"
    return data

# Check if we have the data directory already. If we don't, make it
def checkDataDirectory():
    dataDir = Path(os.path.dirname(os.path.abspath(__file__)) + "/data")
    if dataDir.is_dir():
        return True
    else:
        os.makedirs(str(dataDir))
        return True

# Store data in a text file if we are not connected to the internet or the server is down
# TODO: Look into encrypting this data in storage
def storeOfflineWeather(weatherdata):
    today = datetime.date.today()
    data = constructWeatherString(weatherdata)
    if(checkDataDirectory()):
        file = Path(os.path.dirname(os.path.abspath(__file__)) + "/data/" + today.strftime('%d%m%Y') + ".txt")
        if file.is_file():
            with open(str(file), 'a') as f:
                f.write(data)
        else:
            f = open(str(file), 'w')
            f.write(data)
            f.close()
    return

# Send any stored weather data we may have left after reconnecting to the server
def sendStoredWeather():
    dataDir = Path(os.path.dirname(os.path.abspath(__file__)) + "/data")
    if (dataDir.is_dir()):
        # Iterate through each existing file in our data directory
        for filename in os.listdir(str(dataDir)):
            # Open the file for reading
            with open(os.path.join(str(dataDir), str(filename)), 'r') as f:
                weatherdata = []
                lineIndex = 0
                # Iterate through each line of the file
                for data in f:
                    colIndex = 0
                    linedata = OrderedDict()
                    linedata["created_at"] = ""
                    linedata["apikey"] = ""
                    linedata["temperature"] = ""
                    linedata["humidity"] = ""
                    linedata["pressure"] = ""
                    linedata["latitude"] = ""
                    linedata["longtiude"] = ""

                    # Strip the commas and whitespace from each line and set our data in an array
                    data = data.rstrip('\n')
                    data = [col.strip() for col in data.split(',')]

                    # Iterate through the array of data and store in our linedata dictionary
                    for col in linedata:
                        linedata[col] = data[colIndex]
                        colIndex += 1
                    
                    # Max number of rows in 1 day with data every 3 days is 28800
                    # Send it in 4 chunks so 28800 / 4
                    if (lineIndex == 7200): 
                        try: 
                            r = requests.post(url + '/api/weather/offlineData', json=weatherdata)
                        except (requests.exceptions.ConnectionError):
                            print("Lost connection to server...unable to send stored data.")
                            pass
                        weatherdata = []
                        lineIndex = 0
                    
                    # Under 7200 so just add onto our array of dictionaries
                    else:
                        weatherdata.append(linedata)
                
                # Send whatever we have left if it is less than 7200 lines of data
                try:
                    r = requests.post(url + '/api/weather/offlineData', json=weatherdata)
                except (requests.exceptions.ConnectionError):
                    print("Lost connection to server...unable to send stored data.")
                    pass
            # Remove the file once everything is sent over 
            os.remove(os.path.join(str(dataDir), str(filename)))

if __name__ == '__main__':
    os.environ['TZ'] = 'America/Detroit'
    time.tzset()
    url = "http://67.205.153.103:5000"
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
                humidity, temperature = Adafruit_DHT.read(Adafruit_DHT.AM2302, pin)
            except:
                pass

            # Attempt to retrieve from sense hat
            try:
                humidity = sense.humidity
                temperature = (9.0/5.0) * sense.temperature + 32
                pressure = sense.pressure
            except:
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
            weatherdata["longtiude"] = longitude

            try:
                r = requests.post(url + '/api/weather', data = weatherdata)
                if (r.status_code == 200):
                    sendStoredWeather()
                    print("Sent: " + json.dumps(weatherdata))
                elif (r.status_code == 400):
                    print("Invalid API key")
            # Exception if unable to connect to server for the post request
            except (requests.exceptions.ConnectionError):
                print("Lost connection to server...storing data locally.")
                storeOfflineWeather(weatherdata)
                pass

            # Wait 3 seconds before restarting the loop
            time.sleep(3)

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")