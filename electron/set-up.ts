import { app, BrowserWindow, globalShortcut } from 'electron';
import { isMac, isProd } from './utils';
import { WindowsManager } from './windows-manager';

const mainWindowName = (() => {
  const target = RUNTIME_CONFIG.windows.find((window) => window.isMain);
  return (target && target.name) || 'main';
})();
const windows = RUNTIME_CONFIG.windows.reduce((all, window) => {
  all[window.name] = {
    url: isProd
      ? `file://${__dirname}/${window.name}.html`
      : `http://localhost:${DEV_RENDERER_PORT}/${window.name}.html`,
    isMain: window.name === mainWindowName,
    ...window,
  };
  return all;
}, {});
let mainWindow: BrowserWindow | null = null;
let isQuiting;

export const setUp = (): Promise<{ windowsManger: WindowsManager; mainWindow: BrowserWindow }> => {
  return new Promise((resolve, reject) => {
    if (!mainWindowName) reject(`No main window find!`);

    const windowsManger = new WindowsManager(windows);
    const createMainWindow = () => {
      mainWindow = windowsManger.show(mainWindowName);
      mainWindow.on('close', function (event) {
        if (isProd) {
          if (!isQuiting) {
            event.preventDefault();
            mainWindow.hide();
            return false;
          }
        } else {
          mainWindow = null;
        }
      });
      mainWindow.addListener('close', () => {
        windowsManger.closeAll(mainWindowName);
      });
    };

    app.on('activate', () => {
      if (mainWindow) {
        mainWindow.show();
      } else {
        createMainWindow();
      }
    });
    app.on('ready', () => {
      globalShortcut.register('CommandOrControl+Shift+L', () => {
        let focusWin = BrowserWindow.getFocusedWindow();
        focusWin && (<any>focusWin).toggleDevTools();
      });
      createMainWindow();
      resolve({ windowsManger, mainWindow });
    });
    app.on('before-quit', () => {
      isQuiting = true;
    });
    app.on('window-all-closed', () => !isMac && app.quit());
  });
};
