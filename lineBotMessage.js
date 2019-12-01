const config = require('./config');
// 載入 jwt 函式庫協助處理建立/驗證 token
const jwt = require('jsonwebtoken')

const express = require('express')
const app = express()
app.set('secret', config.secret)
const cors = require('cors')
app.use(cors())

// const fileUpload = require('express-fileupload')
// app.use(fileUpload())
// app.use(express.static('build'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// NodeJs中Express框架使用morgan中間件記錄日誌 使用app.use(logger('dev')); 可以將請求信息打印在控制枱，便於開發調試，但實際生產環境中，需要將日誌記錄在log文檔裏，可以使用如下代碼
var morgan = require('morgan')
app.use(morgan('dev'))

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.QUOTA_DB_DATABASE, config.QUOTA_DB_USER, config.QUOTA_DB_PASSWORD, {
  host: config.QUOTA_DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

//sequelize
const UserModel = require('./models/user')
const User = UserModel(sequelize, Sequelize)
 
var http = require('http');
app.use(express.static('static'));
// const fs = require('fs');
// var privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
// var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
// var credentials = { key: privateKey, cert: certificate };
var server = http.createServer(app);


var linebot = require('linebot');
const bot = linebot({
  channelId: config.CHANNEL_ID,
  channelSecret: config.CHANNEL_SECRET,
  channelAccessToken: config.CHANNEL_ACCESS_TOKEN,
  verify: true
});

app.post('/',  function (req, res) {
  console.log( 'req = ' +  req )

  bot.parse(req.body);
  return res.json({});
});

bot.on('message', function (event) {
  console.log( 'event = ' +  event )
    var replyMsg = `Hello你剛才說的是:${event.message.text}`;
  //console.log(replyMsg)
  event.reply(replyMsg).then(function (data) {
  //event.reply(event.message.text).then(function (data) {
    console.log(event)
    console.log('Success', data);
  }).catch(function (error) {
    console.log('Error', error);
  });
});

app.post('/v2/bot/message/broadcast', function (req, res) {
  console.log('req.body.name = ' + req.body.account)
  console.log('req.body.password = ' + req.body.password)
  User.findOne(  {where:{ username: req.body.account} }  ).then(user => {
    console.log('req.body.password = ' + user.dataValues.password)
        if ( user !== undefined && (user.dataValues.password === req.body.password) && user.dataValues.isActive  ){ 
          		let token = jwt.sign(user.dataValues, app.get('secret'), {
                expiresIn: 60//60*60*24
              })
              return res.status( 200 ).json({
                success: true,
                message: 'Enjoy your token',
                access_token: token,
                expires_in: 60//60*60*24
              });
        } else {
          return res.status( 403 ).json({ success: false, message: 'Authenticate failed. Wrong password'}) 
        }
      }
      ).catch((err) => {
        return res.status( 403 ).json({ success: false, message: err}) 
      })
})
// *************************************************line bot end ***************************************

server.listen(80,"0.0.0.0",function(){
    console.log('server run at http://127.0.0.1:80/ ');
});