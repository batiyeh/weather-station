from channels import Group

def ws_connect(message):
    print("Pi connected")
    path = message['path']

    if path == b'/random/':
        print("Adding new pi to sensor group")
        Group("rng").add(message.reply_channel)
        message.reply_channel.send({
            "text": "You're connected to sensor group:) ",

        })
    else:
        print("Strange connector")

def ws_message(message):
    print("Received" + message['text'])

def ws_disconnect(message):
    print("Pi left group")
    Group("rng").discard(message.reply_channel)