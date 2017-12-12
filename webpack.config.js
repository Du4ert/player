const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const define = require('./webpack/define');

const PATH = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = merge([
    {
      entry: {
        'index': [
          'react-hot-loader/patch',
          //'babel-polyfill',
          PATH.src + '/index.js'],
      },

      output: {
        path: PATH.build,
        filename: './js/[name].js'
      },

      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: PATH.src + '/template.html',
          publicPath: '/js/'
        }),
      ],
    },
    babel(),
    images(),
  ]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      uglifyJS(false),
      extractCSS(),
      define()
      ]);
  }
  if (env === 'development') {
    return merge([
        common,
        sass(),
        css(),
        devserver(),
        {devtool: 'cheap-module-eval-source-map'}
      ]);
  }
}
