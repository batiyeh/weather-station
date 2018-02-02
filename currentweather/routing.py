from currentweather.consumers import ws_message, ws_connect, ws_disconnect

channel_routing = {
    'websocket.connect': ws_connect,
    'websocket.connect': ws_message,
    'websocket.disconnect': ws_disconnect,
}