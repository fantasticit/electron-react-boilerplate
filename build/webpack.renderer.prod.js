const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const UglyfyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { prodRenderEntries, prodHtmlWebpackPlugins } = require('./config');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: prodRenderEntries,
  devtool: false,
  optimization: {
    minimizer: [
      new UglyfyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    ...prodHtmlWebpackPlugins,
    new OptimizeCssAssetsPlugin({}),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  target: 'electron-renderer',
});
