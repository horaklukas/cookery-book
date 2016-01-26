'use strict';

var path = require('path');
var rewirePlugin = require('rewire-webpack');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true, //just run once by default
    frameworks: ['jasmine'],
    files: [
      'test/helpers/tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'test/helpers/tests.webpack.js': [ 'webpack'] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'spec' ],
    webpack: { //kind of a copy of your webpack config
      //devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.gif/,
            loader: 'url-loader?limit=10000&mimetype=image/gif'
          }, {
            test: /\.jpg/,
            loader: 'url-loader?limit=10000&mimetype=image/jpg'
          }, {
            test: /\.png/,
            loader: 'url-loader?limit=10000&mimetype=image/png'
          }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
          }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
          }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          }, {
            test: /\.woff/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          }, {
            test: /\.woff2/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
          }
        ]
      },
      plugins: [
        new rewirePlugin()
      ],
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/styles/'),
          'components': path.join(process.cwd(), './src/components/')
        }
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    logLevel: config.LOG_INFO,
    colors: true,
  });
};