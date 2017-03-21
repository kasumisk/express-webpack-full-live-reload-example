var CryptoJS = require('crypto-js');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');

moment.locale('zh-cn'); // 使用中文

exports.bhash = function (str, callback) {
    bcrypt.hash(str, null, null,function(err, hash) {
        return callback(err, hash);
    });
};

exports.bcompare = function (str, hash, callback) {
    bcrypt.compare(str, hash, function(err,bool){
        return callback(err,bool)
    });
};

// 格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};

exports.getClientIp = function(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}


/*
var crypto = require('crypto');
//加密
exports.cipher = function(algorithm, key, buf ,cb){
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    cb(encrypted);
}
//解密
exports.decipher = function(algorithm, key, encrypted,cb){
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    cb(decrypted);
}
*/
/**
 * AES-128bit--ECB------加密解密算法
 * 参考---------------------
 *http://jser.io/2014/08/19/how-to-use-aes-in-crypto-js-to-encrypt-and-decrypt/
 *
 */
exports.encrypt = function(key,data,cb){
    var keyto128bit = CryptoJS.enc.Utf8.parse(key); //转128bit
    var encrypted =  CryptoJS.AES.encrypt(data, keyto128bit, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    encrypted = encrypted.ciphertext.toString();
    if(cb){
        cb(encrypted);
    }else{
        return encrypted;
    }
};
exports.decrypt = function(key,encrypted,cb){
    var encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var keyto128bit = CryptoJS.enc.Utf8.parse(key);
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, keyto128bit, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    if(cb){
        cb(decryptedStr);
    }else{
        return decryptedStr
    }
};