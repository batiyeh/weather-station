# Generated by Django 2.0.1 on 2018-01-26 22:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('currentweather', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='WeatherStation',
            new_name='Station',
        ),
    ]
