import random
import datetime
import os
import subprocess
from collections import OrderedDict
from pathlib import Path
try:
    import Adafruit_DHT
except:
    print("Adafruit DHT library not installed.")
    pass
try:
    import Adafruit_BMP.BMP280 as BMP280
except:
    print("Adafruit BMP library not installed.")
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
        self.dataIndex = 0
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

        try:
            self.sensor = BMP280.BMP280()
        except:
            print("Failed initializing Pressure Sensor")
            pass
    
    def getSensorData(self, apikey):
        weatherdata = OrderedDict()
        self.getWeather()
        self.getGpsCoords()

        weatherdata["created_at"] = str(datetime.datetime.utcnow())
        weatherdata["apikey"] = apikey
        weatherdata["temperature"] = round(self.temperature, 2)
        weatherdata["humidity"] = round(self.humidity, 2)
        weatherdata["pressure"] = round(self.pressure, 2)
        weatherdata["latitude"] = self.latitude
        weatherdata["longitude"] = self.longitude
        weatherdata["data_index"] = self.dataIndex
        self.dataIndex += 1

        return weatherdata

    def getWeather(self):
        # Attempt to retrieve humidity + temperature
        try:
            humidity, temperature = Adafruit_DHT.read(Adafruit_DHT.AM2302, self.pin)
            
            if (temperature):
                self.temperature = (9.0/5.0) * temperature + 32
            if (humidity):
                self.humidity = humidity
        except:
            pass
        
        try:
            pressure = self.sensor.read_pressure() / 100
            print(pressure)
            if(pressure):
                self.pressure = pressure
        except:
            pass

        # Attempt to retrieve from sense hat
        try:
            self.humidity = self.sense.humidity
            self.temperature = (9.0/5.0) * self.sense.temperature + 32
            self.pressure = self.sense.pressure

            # Calibrate the temperature to account for CPU temp with the sense hat
            cpu_temp = subprocess.check_output("vcgencmd measure_temp", shell=True)
            array = cpu_temp.split("=")
            array2 = array[1].split("'")

            cpu_tempf = float(array2[0]) * 9.0 / 5.0 + 32.0
            cpu_tempf = float("{0:.2f}".format(cpu_tempf))
            self.temperature = self.temperature - ((cpu_tempf - self.temperature) / 5.466)
        except:
            pass
            # self.temperature = random.uniform(70.0, 73.0)
            # self.humidity = random.uniform(50.0, 54.0)
            # self.pressure = random.uniform(1040.0, 1075.0)

    def getGpsCoords(self):
        # Try to get latitude and longitude data from our receiver
        try:
            latitude = self.agps_thread.data_stream.lat
            longitude = self.agps_thread.data_stream.lon
            if (latitude != "n/a" and longitude != "n/a"):
                self.latitude = latitude
                self.longitude = longitude
                self.saveLatestGpsCoords()
            else:
                file = Path(os.path.dirname(os.path.abspath(__file__)) + "/.latest-location.txt")
                if file.is_file():
                    with open(str(file), 'r') as f:
                        for data in f:
                            data = data.rstrip('\n')
                            data = [col.strip() for col in data.split(',')]
                            self.latitude = data[0]
                            self.longitude = data[1]
                    
            # self.latitude = "42.357134"
            # self.longitude = "-83.070308"
        except:
            pass

    def saveLatestGpsCoords(self):
        file = Path(os.path.dirname(os.path.abspath(__file__)) + "/.latest-location.txt")
        f = open(str(file), 'w')
        f.write(str(self.latitude) + "," + str(self.longitude))
        f.close()