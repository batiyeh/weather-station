from django.db import models
from django.utils import timezone

# Abstract Model to determine the fields we want to store for all types of weather data
class AbstractWeather(models.Model):
    wid = models.AutoField(primary_key=True)  # Auto incremented key
    created_at = models.DateTimeField(default=timezone.now)
    temperature = models.FloatField(blank=True, null=True)
    pressure = models.FloatField(blank=True, null=True)
    humidity = models.FloatField(blank=True, null=True)

    class Meta:
        abstract = True

# Model to store extra fields for weather data received from a station
class StationWeather(AbstractWeather):
    stationid = models.CharField(max_length=100, blank=False, null=False)

#Model to store when the station is connected
class Stations(AbstractWeather):
    connected_at = models.DateTimeField(default=timezone.now)
    stationid = models.CharField(max_length=100, blank=False, null=False)




# Model to store extra fields for weather data received from the API
class ApiWeather(AbstractWeather):
    wind_speed = models.CharField(max_length=100)

    def __set__(self):
        return self.temperature + ' - ' + self.wind_speed + ' - ' + self.humidity + ' - ' + self.pressure + ' - ' + self.date_time  #this shows data clear in shell
