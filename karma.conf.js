const join = require('path').join;
const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      join(__dirname, '/src/mockData.test.js')
    ],
    preprocessors: {
      './src/mockData.test.js': [ 'webpack' ]
    },
    frameworks: ['mocha'],
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          'Promise': 'es6-promise'
        })
      ]
    }
    // webpackMiddleware: {
    //   // Any custom webpack-dev-middleware configuration...
    // }
  });
};