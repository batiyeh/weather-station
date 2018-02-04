from channels import Group


def ws_connect(message):
    Group('weatherstations').add(message.reply_channel)


def ws_disconnect(message):
    Group('weatherstations').discard(message.reply_channel)   