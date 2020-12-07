const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base');
const { dependencies } = require('../package.json');

const config = merge(baseConfig, {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    electron: './electron',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../output/dist'),
  },
  externals: [...Object.keys(dependencies || {})],
  target: 'electron-main',
});

if (process.env.NODE_ENV === 'production') {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
      }),
    ],
  };
}

module.exports = config;
