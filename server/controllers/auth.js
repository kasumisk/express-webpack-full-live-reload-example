/**
 * Created by Administrator on 2016/4/29.
 */
var config = require('../config');
var authMiddleware = require('../middlewares/auth');
//var UserProxy  = require('../sqlproxy').user;
var querystring = require('querystring');
var socketClient = require('../common/socket');
var cryptoJS = require('../common/tools');
var _ = require('lodash');
var tools = require('../common/tools');
var User = require('../model').User;


//益玩用户
// sign out
exports.signout = function(req, res, next) {
    authMiddleware.clearTokenFromCookie(req, function(err) {
        console.log('err')
    })
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, {
        path: '/'
    });
    res.redirect('/');
};
//注册
exports.register = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    

    User.findByLoginName(username, function(err, user) {
        if (err) console.log(err);
        if (user) {
            res.status(503, '用户名已存在');
        }
        tools.bhash(password, function(err, hash) {
            if (err) console.log(err);
            var user = new User({
                name: username,
                login_name: username,
                pass: hash
            });
            user.save(function(err) {
                if (err) console.log(err);
                res.send(200);
            });
        });
    });
};

exports.isAdmin = function(req, res, next) {
    var user = req.session.user;
    if (user) {
        if (user.is_admin) next();
        else res.redirect(403, '/admin_login');
    } else {
        res.redirect(403, '/admin_login');
    }
};

//admin  登录

exports.adminLogin = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findByLoginName(username, function(err, user) {
        if (err) console.log(err);
        console.log('222')
        if (!user) {
              return res.status(503, '没有此用户');
        }
        var passHash = user.pass;
        tools.bcompare(password, passHash, function(err, bool) {
            if (!bool) {
                return res.status(503, '密码错误');
            }
            req.session.user = user;
            res.redirect('/admin_home');
        });
    });
};
