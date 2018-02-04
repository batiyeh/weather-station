from channels.routing import route, route_class
from weatherstation.consumers import ws_connect, ws_receive, ws_disconnect

channel_routing = [
    route('websocket.connect', ws_connect),
    route('websocket.receive', ws_receive),
    route('websocket.disconnect', ws_disconnect),
]

# TODO: change the receive method to redirect to this routing on different types
custom_routing = [
    # Handling different chat commands (websocket.receive is decoded and put
    # onto this channel) - routed on the "command" attribute of the decoded
    # message.

    # route("station.receive", new_station, command="new_station"),
    # route("station.receive", sensor_data, command="sensor_data"),
    # route("station.receive", new_station, path="^weatherstations/new_station/"),
    # route("station.receive", sensor_data, path="^weatherstations/sensor_data/"),
]