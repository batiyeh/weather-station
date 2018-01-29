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
