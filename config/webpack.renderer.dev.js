const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:8080/`,
      'webpack/hot/only-dev-server',
      './src/renderer/index.tsx'
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'index.html',
      inject: true,
      hash: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.d\.ts$/])
  ],
  target: 'electron-renderer'
})
