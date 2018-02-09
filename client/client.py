import asyncio
import websockets
import time 
import json

# Function to connect to the server and send data every 5 seconds
async def sensors(uri):
    global wid #TODO: Don't use globals for disconnecting the station
    stationid = "id2"
    temperature = 0
    pressure = 0
    humidity = 0

    # Connect to the websocket open on our django site. 
    # Change localhost to the IP of the server running the site.
    async with websockets.connect(uri) as websocket:
        # Send connection data so we can access the correct station id later
        await websocket.send(json.dumps({"command": "new_station"}))
        wid = await websocket.recv()

        # Continually update our weather values and send them to our open websocket
        while True:
            # Simulate gathering updated data
            temperature += 5
            pressure += 5
            humidity += 5

            weatherdata = {
                "command": "sensor_data",
                "wid": wid,
                "stationid": stationid,
                "temperature": temperature,
                "pressure": pressure,
                "humidity": humidity	
            }

            print("Sending: " + json.dumps(weatherdata))

            # Send a json object to be parsed by our consumer
            await websocket.send(json.dumps(weatherdata))
            response = await websocket.recv()
            print("{}".format(response))
            # Wait 5 seconds before looping through again
            # time.sleep(5)
            await asyncio.sleep(5)

# TODO: Improve the disconnection code. This could probably be done on the server 
# somehow after so many seconds have passed at the server has not updated.
async def disconnect(uri):
    # Connect to the websocket open on our django site again. 
    async with websockets.connect(uri) as websocket:
        # Send station id to disconnect
        await websocket.send(json.dumps({"command": "delete_station", "wid": wid}))
        
try:
    uri = 'ws://localhost:8000/weatherstations/'
    asyncio.get_event_loop().run_until_complete(
        sensors(uri))
    asyncio.get_event_loop().run_forever()

except KeyboardInterrupt:
    asyncio.get_event_loop().run_until_complete(
        disconnect(uri))