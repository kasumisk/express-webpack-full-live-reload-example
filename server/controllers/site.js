/**
 * Created by Administrator on 2016/4/20.
 */
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var UPLOAD_FOLDER = "/upload/";
var moment = require('moment');
var crypto = require('crypto');
var FILENAME_LENGTH = 4;
//upload

exports.home = function (req, res, next) {
    res.render('home')
}
exports.upload = function(req, res, next) {
    console.log(req.files)
    var avatarName, newPath
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public' + UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.render('index', {
                title: ""
            });
            return;
        }
        console.log(files.file.name)
        //res.end(util.inspect({fields: fields, files: files}));
        var extName = ''; //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.end('只支持png和jpg格式图片');
            return;
        }
        var timeTemp = moment().format('YYYYMMDDHHmmss');

        crypto.randomBytes(FILENAME_LENGTH, function(ex, random) {
            if (ex) return ex;
            if (random) {
                avatarName = timeTemp + random.toString('hex') + '.' + extName;
                newPath = form.uploadDir + timeTemp.slice(0, 8) + '/' + avatarName;
                fs.exists(form.uploadDir + timeTemp.slice(0, 8), function(exists) {
                    if (exists) {
                        fs.renameSync(files.file.path, newPath);
                    } else {
                        fs.mkdir(form.uploadDir + timeTemp.slice(0, 8), 0777, function(err) {
                            if (err) {
                                throw err;
                            } else {
                                fs.renameSync(files.file.path, newPath);
                            }
                        });
                    }
                });
            }
        });
    });

    form.on('end', function() {
        res.locals.success = '上传成功';
        console.log('-> post done');
        res.send(201, {
            msg: '上传成功',
            path: avatarName
        });
    });

};

exports.jsonp = function ( req , res , next) {
  var callback = req.query.callback;
  var obj = { 'msg':'ok','ss':'111'}
  res.send(200,callback+'('+JSON.stringify(obj)+')')

}


exports.testpost = function ( req , res , next) {
    console.log(req.body);
    console.log("11111");
    res.send(req.body)

}


exports.test = function(req, res, next) {
    var user = req.session.user;
    console.log(user);
    var path = req.params.path;
    res.render(path, {
        title: 'test',
        user: user,
        names: 'aaaa'
    });
}


exports.adminHome = function(req, res, next) {
    res.render('admin/admin_home', {
        title: 'express'
    });
};

exports.adminShowLogin = function(req, res, next) {
    console.log('render')
    res.render('admin/login', {
        title: '登陆'
    })
}
