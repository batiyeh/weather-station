from django.db import models
from django.utils import timezone

# Model to store the latest data from the weather station.
# TODO: Discuss if we want to store historical data with this model.
class StationWeather(models.Model):
    wsid = models.AutoField(primary_key=True)  # Auto incremented key
    created_at = models.DateTimeField(default=timezone.now)
    temperature = models.FloatField(blank=True, null=True)
    pressure = models.FloatField(blank=True, null=True)
    humidity = models.FloatField(blank=True, null=True)


class ApiWeather(models.Model):
    id = models.IntegerField(primary_key=True)
    temperature = models.CharField(max_length=100)
    wind_speed = models.CharField(max_length=100)
    humidity = models.CharField(max_length=100)
    pressure = models.CharField(max_length=100)
    date_time = models.DateTimeField(timezone.now())

    def __set__(self):
        return self.temperature + ' - ' + self.wind_speed + ' - ' + self.humidity + ' - ' + self.pressure + ' - ' + self.date_time  #this shows data clear in shell

class UserAccount(models.Model):
    userid = models.AutoField(primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=16)
    phone = models.CharField(max_length=10)

