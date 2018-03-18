import random
import datetime
from collections import OrderedDict
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

class Sensors(object):
    def __init__(self):
        self.temperature = 0.0
        self.pressure = 0.0
        self.humidity = 0.0
        self.latitude = "n/a"
        self.longitude = "n/a"
        self.pin = 14

    def initializeSensors(self):
        # Instantiate GPS data retrieval mechanism
        try:
            self.agps_thread = AGPS3mechanism()
            self.agps_thread.stream_data()
            self.agps_thread.run_thread()
        except:
            print("Failed initializing GPS")
            pass
        
        try:
            self.sense = SenseHat()
        except:
            print("Failed initializing Sense Hat")
            pass
    
    def getSensorData(self, apikey):
        weatherdata = OrderedDict()
        self.getWeather()
        self.getGpsCoords()

        weatherdata["created_at"] = str(datetime.datetime.now())
        weatherdata["apikey"] = apikey
        weatherdata["temperature"] = round(self.temperature, 2)
        weatherdata["humidity"] = round(self.humidity, 2),
        weatherdata["pressure"] = round(self.pressure, 2),
        weatherdata["latitude"] = self.latitude,
        weatherdata["longitude"] = self.longitude

        return weatherdata

    def getWeather(self):
        # Attempt to retrieve humidity + temperature
        try:
            self.humidity, self.temperature = Adafruit_DHT.read(Adafruit_DHT.AM2302, self.pin)
            self.temperature = (9.0/5.0) * self.temperature + 32
        except:
            pass

        # Attempt to retrieve from sense hat
        try:
            self.humidity = self.sense.humidity
            self.temperature = (9.0/5.0) * self.sense.temperature + 32
            self.pressure = self.sense.pressure
        except:
            # pass
            self.temperature = random.uniform(70.0, 73.0)
            self.humidity = random.uniform(50.0, 54.0)
            self.pressure = random.uniform(1040.0, 1075.0)

    def getGpsCoords(self):
        # Try to get latitude and longitude data from our receiver
        try:
            self.latitude = self.agps_thread.data_stream.lat
            self.longitude = self.agps_thread.data_stream.lon
            self.latitude = "42.357134"
            self.longitude = "-83.070308"
        except:
            pass