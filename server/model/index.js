var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.db, function (err) {
  console.log(config.db)
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./actdetail');
require('./actsubdetail');
require('./acttype');

exports.User         = mongoose.model('User');
exports.ActDetail         = mongoose.model('ActDetail');
exports.ActSubDetail         = mongoose.model('ActSubDetail');
exports.ActType         = mongoose.model('ActType');
