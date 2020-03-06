# Regist line developers  Messaging api Service and create your channel then you will get info below,  write it into config.js
- CHANNEL_ID
- CHANNEL_SECRET
- CHANNEL_ACCESS_TOKEN
## @config.js
    var config = {
        CHANNEL_ID
        CHANNEL_SECRET
        CHANNEL_ACCESS_TOKEN
    };
    module.exports = config;

# if you don't have ssl. you can use "ngrok".  
1. run gnrok you will get a temporarily https url 
    $ ngrok http 80 
2. then go line console and set it into  Webhook URL. It will forwarward https reques to local port 80

# Try Multicast api. 
curl -v -X POST https://api.line.me/v2/bot/message/multicast \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <yourToken>' \
-d '{ "to": ["<you target user>"], "messages": [{"type": "text", "text": "aaaa"}, {"type":"text", "text":"Hello, world2"}], "notificationDisabled": false}'

# broadcast api.  /v2/bot/message/broadcast