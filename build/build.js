process.env.NODE_ENV = 'production';

const rm = require('rimraf');
const ora = require('ora');
const log = console.log;
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const renderConfig = require('./webpack.renderer.prod');
const mainConfig = require('./webpack.main');

function pack(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        if (stats.hasErrors()) {
          reject('Build failed with errors.\n');
          process.exit(1);
        } else {
          resolve(stats);
        }
      }
    });
  });
}

function remove(files) {
  function deleteFile(path) {
    return new Promise((resolve, reject) => {
      rm(path, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
  return Promise.all(files.map(deleteFile));
}

const spinner = ora('Building for production...');
spinner.start();

remove([path.resolve(__dirname, '../output')])
  .then(() => Promise.all([pack(renderConfig), pack(mainConfig)]))
  .then((stats) => {
    spinner.stop();

    stats.forEach((stats) =>
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        }) + '\n\n'
      )
    );

    log(chalk.cyan('Build complete.\nNow run electron-builder...'));
  })
  .catch((err) => console.log(err));
