var ws_path = "/weatherstations/";
console.log("Connecting to " + ws_path);
var webSocketBridge = new channels.WebSocketBridge();
webSocketBridge.connect(ws_path);

// Listen for and handle incoming messages
webSocketBridge.listen(function(action, stream) {
    console.log(action, stream);
});