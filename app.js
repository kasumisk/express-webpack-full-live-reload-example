const express = require('express'),
    path = require('path'),
    consolidate = require('consolidate');

const isDev = process.env.NODE_ENV !== 'production';
const app = express();
const port = 3000;

const session = require('express-session');
const bodyParser = require('body-parser');
const compress = require('compression');
// const RedisStore = require('connect-redis')(session);
const MongoStore = require('connect-mongo')(session);
const config = require('./server/config');
const passport      = require('passport');
// const logger = require('morgan');
// const auth = require('./middlewares/auth');
const cors = require('cors');


app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './server/views'));



// app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());

// mongo-session
app.use(session({
    store: new MongoStore({
        url: config.db ,
        ttl: 14*24*60*60 
    })
}));
//redis-session
// app.use(session({
//     secret: config.session_secret,
//     store: new RedisStore({
//         port: config.redis_port,
//         host: config.redis_host,
//         ttl:600
//     }),
//     resave: true,
//     saveUninitialized: true
// }));



//cors 允许跨域
app.use(cors());
app.use(function(req , res , next){
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');
    next();
});


// oauth 中间件
// app.use(passport.initialize());

// custom middleware
// app.use(auth.authUserLogin);
//app.use(auth.blockUser());



// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {

    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    require('./server/routes')(app);

    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);

    server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
} else {

    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, 'public')));
    require('./server/routes')(app);
    app.listen(port, function () {
        console.log('App (production) is now running on port 3000!');
    });
}
