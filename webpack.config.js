const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
// const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
  plugins: [
    new UglifyJSPlugin({
      parallel: true
    })
  // new HtmlWebpackPlugin({
  //   inject: true,
  //   template: './src/index.html',
  // }),
  // new AutoDllPlugin({
  //   inject: true, // will inject the DLL bundles to index.html
  //   filename: '[name]_[hash].js',
  //   entry: {
  //     vendor: [
  //       'axios',
  //       'babel-preset-stage-1',
  //       'lodash',
  //       'react',
  //       'react-bootstrap',
  //       'react-dom',
  //       'react-dropzone',
  //       'react-redux',
  //       'react-router',
  //       'react-rpg',
  //       'redux',
  //       'redux-form',
  //       'redux-promise'
  //     ]
  //   }
  // })
  ],
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  }
};
