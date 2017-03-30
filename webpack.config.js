var webpack = require('webpack');
var path = require('path');
var webpackDevConfig = require('./webpack.dev.config');
var webpackProConfig = require('./webpack.production.config');

if (process.env.NODE_ENV === 'production') {
    module.exports = webpackProConfig
}else {
    module.exports = webpackDevConfig
}
// var publicPath = 'http://localhost:3000/';
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
//
// var devConfig = {
//     entry: {
//         home: ['./client/home', hotMiddlewareScript],
//         admin: ['./client/admin', hotMiddlewareScript]
//     },
//     output: {
//         filename: './[name]/bundle.js',
//         path: path.resolve(__dirname, './public'),
//         publicPath: publicPath
//     },
//     devtool: 'eval-source-map',
//     module: {
//         rules: [{
//             test: /\.(png|jpg)$/,
//             use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
//         }, {
//             test: /\.scss$/,
//             use: [
//                 'style-loader',
//                 'css-loader?sourceMap',
//                 'resolve-url-loader',
//                 'sass-loader?sourceMap'
//             ]
//         }]
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoEmitOnErrorsPlugin()
//     ]
// };
//
// module.exports = devConfig;
