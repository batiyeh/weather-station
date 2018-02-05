# Generated by Django 2.0.1 on 2018-02-04 17:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('currentweather', '0002_delete_useraccount'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stations',
            fields=[
                ('wid', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('temperature', models.FloatField(blank=True, null=True)),
                ('pressure', models.FloatField(blank=True, null=True)),
                ('humidity', models.FloatField(blank=True, null=True)),
                ('connected_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('stationid', models.CharField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
