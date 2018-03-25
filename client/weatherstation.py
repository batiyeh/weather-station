import os
import time
import json
import sys
import requests
import datetime
from pathlib import Path
from textstorage import TextStorage
from sensors import Sensors

class Client(object):
    URL = "http://localhost:8000"
    WAIT_TIME = 5

    def main(self):
        self.apikey = self.getApiKey()
        textStorage = TextStorage(self.URL)
        sensors = Sensors()
        sensors.initializeSensors()

        # Continuously loop
        while True:
            # Construct our weatherdata json object
            weatherdata = sensors.getSensorData(self.apikey)

            try:
                r = requests.post(self.URL + '/api/weather', data = weatherdata)
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
            time.sleep(self.WAIT_TIME)
    
    # Get the API key for server requests
    # TODO: Encrypt the key in the file so it is not accessible
    def getApiKey(self):
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
                    r = requests.post(self.URL + '/api/weather/verifyKey', data = {"apikey": key, "time": datetime.datetime.utcnow()})
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
    try:
        Client().main()

    except(KeyboardInterrupt, SystemExit):
        print("\nKilling Thread...")
