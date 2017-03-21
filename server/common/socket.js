/**
 * Created by Administrator on 2016/5/3.
 */
var net = require('net');
var config = require('../config');
var _ = require('lodash');
var cryptoJS = require('../common/tools');

exports.socket2java = function(sockoption, path, data, callback) {
    var client = new net.Socket();
    client.setEncoding('binary');
    cryptoJS.encrypt(config.encryptKey, data, function(encrypted) {
        client.connect({
            host: sockoption.host,
            port: sockoption.port
        }, function() {
            var reqHeaders = {
                'Host': sockoption.host,
                'Content-Length': encrypted.length
            };
            var request = 'POST ' + path + ' HTTP/1.1\n';
            _.forIn(reqHeaders, function(value, key) {
                request += key + ':' + value + '\n';
            });
            request += '\n';
            request += encrypted;
            client.write(request);
        });

        client.on('data', function(data) {
            var result = data.split("\r\n\r\n");
            result = result.slice(result.length - 1);
            cryptoJS.decrypt(config.encryptKey, result[0], function(data) {
                callback(data);
                client.destroy();
            });
        });
        client.on('close', function() {
            console.log('Connection closed');
        });

    });
};
