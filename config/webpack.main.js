const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglyfyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base')

const config = merge(baseConfig, {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    main: './src/main/index.js'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist/electron')
  },
  target: 'electron-main'
})

if (process.env.NODE_ENV === 'production') {
  config.optimization = {}
  config.optimization.minimizer = [
    new UglyfyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: true,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    })
  ]
}

module.exports = config
