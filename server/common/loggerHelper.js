var log4js = require('log4js');
log4js.configure({
    "appenders": [
        // 下面一行应该是用于跟express配合输出web请求url日志的
        {
            "type": "console",
            "category": "console"
        },
        // 定义一个日志记录器
        {
            "type": "dateFile", // 日志文件类型，可以使用日期作为文件名的占位符
            "filename": "e:/Ewan_SVN/act.ewan.cn/logs/", // 日志文件名，可以设置相对路径或绝对路径
            "pattern": "debug/yyyyMMddhh.txt", // 占位符，紧跟在filename后面
            "absolute": true, // filename是否绝对路径
            "alwaysIncludePattern": true, // 文件名是否始终包含占位符
            "category": "dateFileLog" // 记录器名
        }
    ],
    replaceConsole: true, //替换console.log
    levels: {
        dateFileLog: 'DEBUG'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');

exports.logger = dateFileLog;

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {
        level: 'debug',
        format: ':method :url',
    }));
}
