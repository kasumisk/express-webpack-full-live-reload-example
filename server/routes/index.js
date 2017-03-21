module.exports = function (app) {
  app.use('/', require('./web_router'));
  app.use('/admin', require('./admin'));
  app.use('/api', require('./api'));
};