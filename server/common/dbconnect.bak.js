/**
 * Created by Administrator on 2016/4/25.
 */
// var mysql      = require('mysql');
// var config     = require('../config');
// var connection = handleDisconnect();
//
//
//
// function handleDisconnect() {
//     connection = mysql.createConnection(config.mysql);
//     connection.connect(function(err) {
//         if(err) {
//             console.log("进行断线重连：" + new Date());
//             setTimeout(handleDisconnect, 2000);   //2秒重连一次
//             return;
//         }
//         console.log("连接成功");
//     });
//     connection.on('error', function(err) {
//         console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
//     return connection;
// }

//user Sequelize ORM mysql
var Sequelize = require('sequelize');
var config = require('../config');
var sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


  var User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  });

  sequelize.sync().then(function() {
    return User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    });
  }).then(function(jane) {
    console.log(jane.get({
      plain: true
    }));
  });


module.exports = sequelize;
