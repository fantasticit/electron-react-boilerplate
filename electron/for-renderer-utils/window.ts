import { remote } from 'electron';
import { WINDOW_OPEN, WINDOW_CLOSE, WINDOW_PREVENT_CLOSE } from '../constants';
import { ipc } from './ipc';

/**
 * 开启窗口
 * @param name
 */
export const openWindow = (name: string) => ipc(WINDOW_OPEN, { name });

/**
 * 关闭窗口
 * @param name
 */
export const closeWindow = (name: string) => ipc(WINDOW_CLOSE, { name });

/**
 * 向指定窗口发送消息
 * @param name
 * @param message
 * @param body
 */
export const sendToWindow = (name: string, message: string, body: any) => {
  name = name.toLowerCase();
  const window = remote.BrowserWindow.getAllWindows().find((window) => name === window['name']);
  if (!window) return;
  if (window.isVisible()) {
    window.webContents.send(message, body);
  } else {
    window.once('show', () => {
      window.webContents.send(message, body);
    });
  }
};

/**
 * 向所有窗口发送消息
 * @param message
 * @param body
 */
export const sendToAllWindow = (message: string, body: any) => {
  remote.BrowserWindow.getAllWindows().forEach((window) => {
    if (window.isVisible()) {
      window.webContents.send(message, body);
    } else {
      window.once('show', () => {
        window.webContents.send(message, body);
      });
    }
  });
};
/**
 * 当关闭窗口前执行回调
 * @param callback () => Promise<boolean>
 */
export const beforeWindowClose = (callback: () => Promise<boolean>) => {
  const window = remote.getCurrentWindow();
  const listener = async (evt) => {
    evt.preventDefault();

    try {
      const value = await callback();
      if (value) {
        window.removeListener('close', listener);
        window.destroy();
      }
    } catch (e) {}
  };
  // 通知主进程阻止关闭窗口
  window.on('close', listener);
  ipc(WINDOW_PREVENT_CLOSE, { name: window['name'] });
};
