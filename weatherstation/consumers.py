import json
from channels import Group

def ws_connect(message):
    Group('weatherstations').add(message.reply_channel)
    # Either use the existing StationWeather model (I had envisioned that model to store individual points of data for the weather but idk anymore)
    # Or create a new model called Stations or something and store all of the connected ones there
    # It'd be something like q = Stations(data you want to set)
    # and then q.save()
    message.reply_channel.send({'accept': True})

def ws_receive(message):
    print(message)
    # print(json.loads(message))
    # print("stationid: " + message['stationid'] + ", temperature: " + message['temperature'])

def ws_disconnect(message):
    # Don't forget to delete the connected station when it disconnects in this function
    Group('weatherstations').discard(message.reply_channel)   