import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import {
  UPDATE_DOWNLOAD,
  UPDATE_DOWNLOADING,
  UPDATE_DOWNLOADED,
  UPDATE_CHECK,
  UPDATE_ERROR,
  UPDATE_CHECKING,
  UPDATE_AVAILABLE,
  UPDATE_NOT_AVAILABLE,
  UPDATE_INSTALL,
} from './constants';
import { WindowsManager } from './windows-manager';

const UPDATE_URL = RUNTIME_CONFIG.update || (PACKAGE_JSON.build && PACKAGE_JSON.build.publish);

export const setUpdate = (windowManger: WindowsManager) => {
  if (!UPDATE_URL) {
    console.log('未配置 update.url，不配置自动更新机制');
    return;
  }
  const send = (cb) => {
    const windows = windowManger.getAllWindows();
    windows.forEach((window) => {
      cb(window);
    });
  };
  autoUpdater.autoDownload = false;
  autoUpdater.setFeedURL(UPDATE_URL);
  // 检查更新出错
  autoUpdater.on('error', function (error) {
    send((window) =>
      window.webContents.send(UPDATE_ERROR, {
        msg: error.message || error,
      })
    );
  });
  // 正在检查更新
  autoUpdater.on('checking-for-update', function (info) {
    send((window) => window.webContents.send(UPDATE_CHECKING, info));
  });
  // 检测到新版本，正在下载
  autoUpdater.on('update-available', function (info) {
    send((window) => window.webContents.send(UPDATE_AVAILABLE, info));
  });
  // 无可用更新
  autoUpdater.on('update-not-available', function (info) {
    send((window) => window.webContents.send(UPDATE_NOT_AVAILABLE, info));
  });
  // 下载进度
  autoUpdater.on('download-progress', function (progress) {
    send((window) => window.webContents.send(UPDATE_DOWNLOADING, progress));
  });
  autoUpdater.on(
    'update-downloaded',
    function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      // 渲染进程要求安装时，进行安装
      ipcMain.on(UPDATE_INSTALL, () => {
        autoUpdater.quitAndInstall();
      });
      // 向渲染进程发送下载完成信息
      send((window) =>
        window.webContents.send(UPDATE_DOWNLOADED, {
          releaseNotes,
          releaseName,
          releaseDate,
          updateUrl,
        })
      );
    }
  );
  // 渲染进程要求检查更新时，检查更新
  ipcMain.on(UPDATE_CHECK, () => {
    autoUpdater.checkForUpdates();
  });
  // 下载
  ipcMain.on(UPDATE_DOWNLOAD, () => {
    autoUpdater.downloadUpdate();
  });
};
