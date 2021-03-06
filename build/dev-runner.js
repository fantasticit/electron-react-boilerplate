process.env.NODE_ENV = 'development';

const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const electron = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { config } = require('./config');
const mainConfig = require('./webpack.main');
const rendererConfig = require('./webpack.renderer.dev');

let electronProcess = null;

function startRender() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(rendererConfig);
    const server = new webpackDevServer(compiler, {
      contentBase: path.resolve(__dirname, '../output/dist'),
      quiet: true,
      hot: true,
    });
    server.listen(config.port);
    resolve();
  });
}

function startMain() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(mainConfig);
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log('here error: ', err);
        reject(err);
      }
      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid);
        electronProcess = null;
        startElectron();
      }
      resolve();
    });
  });
}

function electronLog(msg, color) {
  let info = '';
  msg
    .toString()
    .split(/\r?\n/)
    .forEach((line) => (info += `  ${line}\n`));
  console.log(
    chalk[color].bold('『 Electron ----------------------------------------------------------- ') +
      '\n\n' +
      info +
      '\n\n' +
      ' ------------------------------------------------------------- Electron 』'
  );
}

function startElectron() {
  electronProcess = spawn(electron, [
    '--inspect=' + config.port,
    path.join(__dirname, '../output/dist/electron.js'),
  ]);
  electronProcess.stdout.on('data', (data) => electronLog(data, 'blue'));
  electronProcess.stderr.on('data', (data) => electronLog(data, 'red'));
}

const spinner = ora('Building dev-server...\n\n');
spinner.start();

rm(path.resolve(__dirname, '../dist'), (err) => {
  if (err) {
    throw new Error(err);
  }
  Promise.all([startRender(), startMain()])
    .then(() => spinner.stop() && startElectron())
    .catch((err) => console.log(err));
});
