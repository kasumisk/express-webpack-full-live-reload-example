/**
 * config
 */

var path = require('path');

var config = {
  // debug 为 true 时，用于本地调试
  debug: true,
  interfaceDomain:'http://dev.www.123cw.cn',
  get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader

  name: 'ewan', //  易玩游戏
  description: '', // 社区的描述
  keywords: '',

  // 添加到 html head 中的信息
  site_logo: '/public/images/cnodejs_light.svg', // default is `name`
  site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址

  // cdn
  site_static_host: 'http://static.web.ewan.cn/', // 静态文件存储域名
  //java 接口
  javaSdk:{
    url:'http://dev.sdk.ewan.cn',
    host:'dev.sdk.ewan.cn',
    port:'80'
  },
  // mongodb 配置
  db: 'mongodb://127.0.0.1/xiehaiji',
  //mysql 配置
  mysql:{
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'xiehaiji'
  },
  Devmysql:{
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'act'
  },
  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  pass:'',
  redis_db: 0,

  //签名算法字串
  encryptKey:"cwQ52wanEJkW56Xc",
  session_secret: '90c68746-e273-4f45-b058-3fd420fab7f2',
  auth_cookie_name: 'ewan_dev',
  secretToken: '489950a4-bcad-4ce8-9b6c-8423473e8e66',
  // 程序运行的端口
  port: 3000,

  // 邮箱配置
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'club@126.com',
      pass: 'club'
    }
  },

  // admin 可删除话题，编辑标签，设某人为达人
  admins: { user_login_name: true },

  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true,

  // newrelic 是个用来监控网站性能的服务
  newrelic_key: 'yourkey',

  // 下面两个配置都是文件上传的配置

  // 7牛的access信息，用于文件上传
  qn_access: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    domain: 'http://your qiniu domain'
  },

  // 文件上传配置
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
  }

};

if (process.env.NODE_ENV !== 'production') {
  config.db = 'mongodb://127.0.0.1/xiehaiji';

}

module.exports = config;
