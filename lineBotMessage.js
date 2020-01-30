const config = require('./config');
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
app.set('secret', config.secret)
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
var morgan = require('morgan')
app.use(morgan('dev'))

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(config.QUOTA_DB_DATABASE, config.QUOTA_DB_USER, config.QUOTA_DB_PASSWORD, {
//   host: config.QUOTA_DB_HOST,
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   operatorsAliases: false
// });

// const UserModel = require('./models/user')
// const User = UserModel(sequelize, Sequelize)
 
var http = require('https');
app.use(express.static('static'));
const fs = require('fs');
var privateKey = fs.readFileSync(__dirname + '/ssl/private.key');
var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
var credentials = {
  key: privateKey,
  cert: certificate,
  requestCert: true,
  rejectUnauthorized: false,
};
var server = http.createServer(credentials, app);
server.listen(443, '0.0.0.0', function() {
  console.log('server run at http://127.0.0.1:443/ ');
});

// var http = require('http');
// app.use(express.static('static'));
// var server = http.createServer(app);
// server.listen(80,"0.0.0.0",function(){
//   console.log('server run at http://127.0.0.1:80/ ');
// });

var linebot = require('linebot');
const bot = linebot({
  channelId: config.CHANNEL_ID,
  channelSecret: config.CHANNEL_SECRET,
  channelAccessToken: config.CHANNEL_ACCESS_TOKEN,
  verify: true
});

app.post('/',  function (req, res) {
  // console.log( 'req.body = ' +  req.body )
  console.log( 'req.bodyJSON.stringify = ' +  JSON.stringify( req.body ) )
  
  bot.parse(req.body);
  return res.json({});
});

bot.on('message', function (event) {
  // console.log( 'event = ' +  event )
  console.log(event)
  var replyMsg = `Hello you just type :${event.message.text}`;
  event.reply(replyMsg).then(function (data) {
    //console.log(event)
    console.log('Success', data);
  }).catch(function (error) {
    console.log('Error', error);
  });
});

// *************************************************line bot end ***************************************
