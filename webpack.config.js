/** @prettier */

const DIST_DIR = 'dist';

const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const IS_DEVS = process.env.NODE_ENV === 'development';

const plugins = [];

if (!IS_DEVS) {
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        output: {
          comments: 'some'
        }
      }
    }),
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} ${pkg.author} | ${pkg.license}`
    })
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'sws-calendar': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, DIST_DIR),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: IS_DEVS ? 'source-map' : false,
  optimization: {
    minimize: false
  },
  plugins: plugins
};
