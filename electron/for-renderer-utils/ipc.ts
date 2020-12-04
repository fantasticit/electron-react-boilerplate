import { ipcRenderer } from 'electron';

/**
 * 渲染进程向主进程发送消息
 * @param type
 * @param arg
 */
export function ipc(type, arg = null) {
  return new Promise((resolve, reject) => {
    ipcRenderer.once('success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.once('error', (_, arg) => {
      reject(arg);
    });
    ipcRenderer.send(type, arg);
  });
}
