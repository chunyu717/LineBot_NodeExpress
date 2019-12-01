// var mongoose = require('mongoose')
// var Schema = mongoose.Schema

// module.exports = mongoose.model('User', new Schema({
//   name: String,
//   password: String,
//   admin: Boolean
// }))

//sequelize
module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        username: {
          type: type.STRING,
          primaryKey: true//,
          //autoIncrement: true
        },
        password: type.STRING,
        realname: type.STRING,
        gender: type.BOOLEAN,
        mobile: type.STRING,
        address: type.STRING,
        createdAt: type.DATE,
        type:  type.BIGINT,
        isActive: type.BOOLEAN
  
    }, {freezeTableName: true, 
      timestamps: false, paranoid: true})
  }