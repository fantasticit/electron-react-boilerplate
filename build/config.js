const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configFile = path.join(__dirname, '../erb.config.js');
const config = Object.assign(
  Object.create(null),
  {
    port: 8080,
    windows: [],
  },
  fs.existsSync(configFile) ? require(configFile) : {}
);
exports.config = config;

// 以下为 webpack 相关配置
const generateWebpackConfig = (isDev = false) => {
  return {
    entries: config.windows.reduce((all, window) => {
      all[window.name] = isDev
        ? [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${config.port}`,
            'webpack/hot/only-dev-server',
            path.join(__dirname, `../src/${window.name}/index.tsx`),
          ]
        : path.join(__dirname, `../src/${window.name}/index.tsx`);
      return all;
    }, {}),
    htmlWebpackPlugins: config.windows.map((window) => {
      return new HtmlWebpackPlugin({
        filename: `${window.name}.html`,
        template: path.join(__dirname, 'template.html'),
        title: window.title || window.name,
        inject: true,
        hash: true,
        chunks: [window.name],
        ...(isDev
          ? {
              minify: {
                removeComment: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 移除空白符
                removeAttributeQuotes: true, // 移除 HTML 中的属性引号
              },
              nodeModules: path.resolve(__dirname, '../node_modules'),
            }
          : {}),
      });
    }),
  };
};
const devWebpackConfig = generateWebpackConfig(true);
exports.devRenderEntries = devWebpackConfig.entries;
exports.devHtmlWebpackPlugins = devWebpackConfig.htmlWebpackPlugins;

const prodWebpackConfig = generateWebpackConfig(false);
exports.prodRenderEntries = prodWebpackConfig.entries;
exports.prodHtmlWebpackPlugins = prodWebpackConfig.htmlWebpackPlugins;

exports.definePlugin = new webpack.DefinePlugin({
  PACKAGE_JSON: JSON.stringify(require('../package.json')),
  RUNTIME_CONFIG: JSON.stringify(config),
  DEV_RENDERER_PORT: JSON.stringify(config.port),
});
