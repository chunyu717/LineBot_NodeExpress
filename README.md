# 註冊 line developers 的 Messaging api 服務
開啟 channel 會得到 CHANNEL_ID, CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN

設定 Webhook URL. 實際上 聊天室的所有訊息都會打到這個 webhook url 上. 
必須是 https 的. 如果沒有 SSL 憑證可用 ngrok.
$ ngrok http 80 
其會給定一個暫時的 https url forwarding 到本地端的 port 80. 

# multicast api. 
curl -v -X POST https://api.line.me/v2/bot/message/multicast \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer wbU0YlX/dbL5+FO82EPLXZ9u48PRHC0clobE7wYmZdA+R0V5DldadPBykC6AwOJNa2h4Tj55X27NPhDQngcZykQVGKZHtS0fF7PJBrrwYJIr9FbxRRNypVQopWUZ6AkQlwu2LLnPPaBJ3bLttuuH7AdB04t89/1O/w1cDnyilFU=' \
-d '{ "to": ["Udeadbeefdeadbeefdeadbeefdeadbeef"], "messages": [{"type": "text", "text": "aaaa"}, {"type":"text", "text":"Hello, world2"}], "notificationDisabled": false}'

# broadcast api.  /v2/bot/message/broadcast