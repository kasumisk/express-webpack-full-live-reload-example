/**
 * Created by Administrator on 2016/4/20.
 */
var fs = require('fs');
var path = require('path');
var actDetail = require('../model').ActDetail;
var actSubDetail = require('../model').ActSubDetail;
var actType = require('../model').ActType;
var _ = require('lodash');
var moment = require('moment');

exports.render = function(req, res, next) {
    var renderPath = req.params.path;
    renderPath = renderPath.replace(/-/g, '/');
    console.log("path==========" + renderPath)
        //方案1
        /*console.log(path.join(__dirname, '../public/act/'+renderPath+'.html'))
        fs.readFile(path.join(__dirname, '../public/act/'+renderPath+'.html'), function (err,bytesRead) {
            if (err) throw err;
            console.log(bytesRead);
            res.render('act/index',{title:'express',container:bytesRead,what:'aaa'});
        });*/
        //方案2
    res.render('act/index', {
        title: 'express',
        path: '../../public/act/' + renderPath + '.ejs',
        what: 'aaaa',
        users: ['geddy', 'neil', 'alex']
    });
};


exports.list = function(req, res, next) {
    actDetail.fetch(function(err, docs) {
        var respData = {
            "aaData": docs
        };
        res.send(respData);
    });
};

exports.detail = function(req, res, next) {
    var id = req.query._id || req.params._id;
    if (id) {
        actDetail.findById(id, function(err, act) {
            res.send(act);

        });
    } else {
        next();
    }
}
exports.actSub = function(req, res, next) {
    var id = req.query.act_id || req.params.act_id;
    actSubDetail.fetchactid(id, function(err, docs) {
        res.send(docs);
    })

}
exports.type = function(req, res, next) {
    actType.fetch(function(err, docs) {
        res.send(docs);
    });

}

exports.new = function(req, res, next) {
    var actDetailObj = req.body;
    var _actDetail = new actDetail({
        act_id: actDetailObj.act_id,
        des: actDetailObj.des,
        title: actDetailObj.title,
        keywords: actDetailObj.keywords,
        site_des: actDetailObj.site_des,
        type: actDetailObj.type,
        platform: actDetailObj.platform,
        url: actDetailObj.url,
        status: {
            type: Boolean,
            default: true
        },
        start_at: actDetailObj.start_at,
        end_at: actDetailObj.end_at,
        meta: {
            create_at: {
                type: Date,
                default: Date.now
            },
            update_at: {
                type: Date,
                default: Date.now
            }
        }
    })
    _actDetail.save(function(err) {
        if (err) {
            console.log(err);
            res.status(503)
        } else res.end();
    })


}

exports.newSub = function(req, res, next) {
    var actSubDetailObj = req.body;
    var _actSubDetail = new actSubDetail({
        act_id: actSubDetailObj.act_id,
        title: actSubDetailObj.title,
        keywords: actSubDetailObj.keywords,
        site_des: actSubDetailObj.site_des,
        url: actSubDetailObj.url,
        status: {
            type: Boolean,
            default: true
        },
        start_at: actSubDetailObj.start_at,
        end_at: actSubDetailObj.end_at,
        meta: {
            create_at: {
                type: Date,
                default: Date.now
            },
            update_at: {
                type: Date,
                default: Date.now
            }
        }
    })
    _actSubDetail.save(function(err) {
        if (err) console.log(err);
        else res.end();
    })


}



exports.newType = function(req, res, next) {
    var actTypeObj = req.body;
    var _actType = new actType({
        type_id: actTypeObj.type_id,
        type_name: actTypeObj.type_name,
        type_des: actTypeObj.type_des,
        status: {
            type: Boolean,
            default: true
        },
        meta: {
            create_at: {
                type: Date,
                default: Date.now
            },
            update_at: {
                type: Date,
                default: Date.now
            }
        }
    })
    _actType.save(function(err) {
        if (err) console.log(err);
        else res.end();
    })
}


exports.actUpdate = function(req, res, next) {
    var id = req.body._id || req.params._id;
    var actDetailObj = req.body;
    actDetail.findById(id, function(err, act) {
        if (err) console.log(err);
        var newAct = _.extend(act, actDetailObj);
        newAct.save(function(err) {
            if (err) console.log(err);
            else res.end();
        })
    })
}

exports.typeUpdate = function(req, res, next) {
    var id = req.body._id;
    var actTypeObj = req.body;
    actType.findById(id, function(err, type) {
        if (err) console.log(err);
        var newType = _.extend(type, actTypeObj);
        newType.save(function(err) {
            if (err) console.log(err);
            else res.end();
        })
    })
}

exports.actSubUpdate = function(req, res, next) {
    var id = req.body._id || req.params._id;
    var actSubDetailObj = req.body;
    actSubDetail.findById(id, function(err, act) {
        if (err) console.log(err)
        var newAct = _.extend(act, actSubDetailObj)
        newAct.save(function(err) {
            if (err) console.log(err)
            else res.end();
        })
    })
}
