var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, './app');
var BUILD_DIR = path.resolve(__dirname, './build/js');


module.exports = {
    entry: APP_DIR+'/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {

        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            include: APP_DIR,
            exclude: APP_DIR + '/node_modules/',

            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};