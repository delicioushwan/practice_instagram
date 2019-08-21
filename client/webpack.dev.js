const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
