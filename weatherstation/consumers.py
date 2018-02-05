import json
from channels import Group
from channels import Channel
from currentweather.models import Stations

# Consumer to handle weather station connections.
def ws_connect(message):
    Group('weatherstations').add(message.reply_channel)
    message.reply_channel.send({'accept': True})

# Called when any data is sent via websocket. 
# Decides which consumer to send it to once it receives data
def ws_receive(message):
    data = json.loads(message.content['text'])
    
    # If we haven't registered our new station that was connected
    if (data['command'] == "new_station"):
        # print('New Station')
        q = Stations(temperature = 0, humidity = 0, pressure = 0)
        q.save()
        message.reply_channel.send({'text': str(q.wid)})

    # If we are just updating sensor data
    elif (data['command'] == "sensor_data"):
        # print("stationid: " + str(data['stationid']) + ", temperature: " + str(data['temperature']) + ", humidity: " + str(data['humidity']) + ", pressure: " + str(data['pressure']))
        ws = Stations.objects.get(wid=str(data['wid']))
        ws.temperature = data['temperature']
        ws.humidity = data['humidity']
        ws.pressure = data['pressure']
        ws.save()
        message.reply_channel.send({'text': "data stored"})

    # If we are just updating sensor data
    elif (data['command'] == "delete_station"):
        # print("stationid: " + str(data['stationid']) + ", temperature: " + str(data['temperature']) + ", humidity: " + str(data['humidity']) + ", pressure: " + str(data['pressure']))
        ws = Stations.objects.get(wid=str(data['wid'])).delete()
        message.reply_channel.send({'text': "station deleted"})
    

# Called when the weatherstation is disconnected from our server
# Method should remove the connected weatherstation from the table
def ws_disconnect(message):
    print(message.content)
    # Don't forget to delete the connected station when it disconnects in this function
    Group('weatherstations').discard(message.reply_channel)   