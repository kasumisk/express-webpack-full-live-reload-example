var config        = require('../config');
var request       = require('request');


/**
 *token验证中间件
 */

var redisHelper = require('../common/redisHelper');
var tokenHelper = require('../common/tokenHelper');
var TIME_TO_LIVE = 60*60; //24 hours

/**
 * Middleware to verify the token and store the user data in req._user
 */
exports.verify = function(req, res, next) {
  var headers = req.headers;
  if (headers == null) return res.send(401);

  // Get token
  try {
    var token = tokenHelper.extractTokenFromHeader(headers);
  } catch (err) {
    console.log(err);
    return res.send(401);
  }

  //Verify it in redis, set data in req._user
  redisHelper.getDataByToken(token, function(err, data) {
    if (err) return res.send(401);

    req._user = data;

    next();
  });
};

/*
 * Expires the token (remove from redis)
 */
exports.expireToken = function(headers, callback) {
  if (headers == null) callback(new Error('Headers are null'));
  // Get token
  try {
    var token = tokenHelper.extractTokenFromHeader(headers);

    if (token == null) callback(new Error('Token is null'));

    redisHelper.expireToken(token, callback);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
}

/**
 * 创建一个token，保存在data在redis上设置时间为秒
 * data     保存的数据
 * ttl      时间
 * callback(err, token);
 */
exports.createAndStoreToken = function(data, ttl, callback) {
  data = data || {};
  ttl = ttl || TIME_TO_LIVE;

  if (data != null && typeof data !== 'object') callback(new Error('data is not an Object'));
  if (ttl != null && typeof ttl !== 'number') callback(new Error('ttl is not a valid Number'));

  tokenHelper.createToken(function(err, token) {
    if (err) callback(err);

    redisHelper.setTokenWithData(token, data, ttl, function(err, success) {
      if (err) callback(err);

      if (success) {
        callback(null, token);
      }
      else {
        callback(new Error('Error when saving token'));
      }
    });
  });
};


/**
 * 清除cookie里的token,用于用户登出
 * @param req
 * @param callback
 * @returns {*}
 */


exports.clearTokenFromCookie = function(req, callback) {

  var auth_token = req.signedCookies[config.auth_cookie_name];
  if (!auth_token) {
    return callback(new Error ('token is null'));
  }

  var auth = auth_token.split('$$$$');
  var token = auth[0];

  redisHelper.expireToken(token, callback);

}

/**
 * 验证用户登录状态中间件
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.authUserLogin = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    var auth_token = req.signedCookies[config.auth_cookie_name];
    if (!auth_token) {
      return next();
    }
    var auth = auth_token.split('$$$$');
    var token = auth[0];
    redisHelper.getDataByToken(token, function(err, data) {
      if (err) return next();
      req.session.user = data;
      req.session.token = token;
      next();
    });
  }
}

function gen_session(user, res) {
  var auth_token = user + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
  var opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
  };
  res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天

}

exports.gen_session = gen_session;


/**
 * 后台登录本地认证策略
 *
 *
 *
 */
