$(function(){
    // var ws_scheme = window.location.protocol == "http:" ? "wss" : "ws";
    var sock = new ReconnectingWebSocket('http://' + window.location.host);

    sock.onopen = function(){
        console.log("Socket Connected!");
        $('#sensor').text("Socket Connected!");
        sock.send("Connected!");
    };
    sock.onmessage = function(message){
        console.log("Received sock message!");
        console.log(message);
        $('#sensor').text(message.data);
    };
});