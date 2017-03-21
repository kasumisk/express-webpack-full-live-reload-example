/**
 * Created by Administrator on 2016/4/20.
 */
var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var act = require('../controllers/act');
//
//router.get('/signin',webapiauth.tokensignin);
//router.get('/protected',auth.verify,webapiauth.protected);
//router.get('/expire',webapiauth.expire);
//acts
router.get('/acts/',act.list);
router.get('/acts/:_id',act.detail);
router.get('/acts/:act_id/subs',act.actSub);
router.get('/act_types',act.type);

router.post('/acts',act.new);
router.post('/acts/:act_id/subs',act.newSub);
router.post('/act_types',act.newType);

router.put('/acts/:_id',act.actUpdate);
router.put('/acts/:act_id/subs/:_id',act.actSubUpdate);
router.put('/act_types/:_id',act.typeUpdate);
//template
/*router.delete('/act_admin/act',act.actDelete);
router.delete('/act_admin/type',act.typeDelete);*/



module.exports = router;
