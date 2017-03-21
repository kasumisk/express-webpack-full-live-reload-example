/**
 * Created by Administrator on 2016/4/20.
 */
var express = require('express');
var router = express.Router();
var act = require('../controllers/act');
var auth = require('../controllers/auth');
var site = require('../controllers/site');
// var geetestApi = require('../controllers/geetest');

/*var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;*/

//test
// router.get('/test/:path',site.test)
router.get('/',site.home);

router.get('/act/:path',act.render);

//模板渲染

//极验api
// router.get('/geetest/register',geetestApi.register);
// router.post('/geetest/validate',geetestApi.validate);
//上传图片
router.post('/upload',site.upload)

//jsonp 示例
router.get('/jsonp',site.jsonp)
router.post('/testpost',site.testpost)

//后台管理
router.get('/signout',auth.signout);
router.post('/admin_signin',auth.adminLogin);
router.post('/register',auth.register);
router.get('/admin_home',auth.isAdmin,site.adminHome);
router.get('/admin_login',site.adminShowLogin);
/*passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            userType: '管理员',
            username: 'admin',
            password: '123456',
            userStatus: true
        }; // 可以配置通过数据库方式读取登陆账号

        console.log("username=========="+username)
        if (username !== user.username) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (password !== user.password) {
            return done(null, false, {message: 'Incorrect password.'});
        }

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});

router.post('/admin_signin',
    passport.authenticate('local', {
        successRedirect: '/admin_login',
        failureRedirect: '/admin_home',
        failureFlash: true
    }));*/
/*router.post('/admin_signin',function(req,res,next){
    console.log("username111========"+req.body.username)

})*/


module.exports = router;
