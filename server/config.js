/**
 * config
 */

if(process.env.NODE_ENV === 'production'){
  module.exports = require('./config-pro')
}else{
  module.exports = require('./config-dev')
}
