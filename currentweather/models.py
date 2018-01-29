from django.db import models

# The models file is used for creating database schemas that you can use to query the database
class Weather(models.Model):
    temperature = models.CharField(max_length=100)
    wind_speed = models.CharField(max_length=100)
    humidity = models.CharField(max_length=100)
    pressure = models.CharField(max_length=100)
    date_time = models.DateTimeField()

    def __set__(self):
        return self.temperature + ' - ' + self.wind_speed + ' - ' + self.humidity + ' - ' + self.pressure + ' - ' + self.date_time  #this shows data clear in shell
    