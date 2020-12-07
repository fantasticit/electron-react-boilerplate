const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { devRenderEntries, devHtmlWebpackPlugins } = require('./config');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: devRenderEntries,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    ...devHtmlWebpackPlugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
  ],
  target: 'electron-renderer',
});
