# 註冊 line developers 的 Messaging api 服務
開啟 channel 會得到 CHANNEL_ID, CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN

設定 Webhook URL. 實際上 聊天室的所有訊息都會打到這個 webhook url 上. 
必須是 https 的. 如果沒有 SSL 憑證可用 ngrok.
$ ngrok http 80 
其會給定一個暫時的 https url forwarding 到本地端的 port 80. 

