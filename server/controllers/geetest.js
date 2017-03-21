/**
 * 极验接口
 */

var privateKey = '36fc3fe98530eea08dfc6ce76e3d24c4';
var publicKey = 'b46d1900d0a894591916ea94ea91bd2c';


var geetest = new Geetest({
    geetest_id: publicKey, // 将xxx替换为您申请的id
    geetest_key: privateKey, // 将xxx替换为您申请的key
});

var geetestApi = {
    register:function (req, res) {

        // 向极验申请一次验证所需的challenge
        geetest.register(function (err, data) {
            if (err) {
                res.send(JSON.stringify({
                    gt: publicKey,
                    success: 0
                }));
            } else {
                res.send(JSON.stringify({
                    gt: publicKey,
                    challenge: data,
                    success: 1
                }));
            }
        })
    },
    validate:function (req, res ,callback) {

        // 对ajax提交的验证结果值进行验证
        geetest.validate({

            challenge: req.body.geetest_challenge,
            validate: req.body.geetest_validate,
            seccode: req.body.geetest_seccode

        }, function (err, result) {

            var data = {status: "success", info: '登录成功'};

            if (err || !result) {

                data.status = "fail";
                data.info = '登录失败';
            }
            callback(result)
            //res.send(JSON.stringify(data));

        })
    }
}


module.exports = geetestApi;
