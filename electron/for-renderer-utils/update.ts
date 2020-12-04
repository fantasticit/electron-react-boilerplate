import { ipcRenderer } from 'electron';
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
} from '../constants';
import { ipc } from './ipc';

const noop = (arg = null) => {};

let isUpdateDownloaded = false;
/**
 * 检查更新
 * @param param0
 */
export const checkUpdate = ({
  onChecking = noop,
  onAvailable = noop,
  onNoAvailable = noop,
  onError = noop,
}: {
  onChecking?: (arg) => void; // 正在检查
  onAvailable?: (arg) => void; // 可以更新
  onNoAvailable?: (arg) => void; // 无更新
  onError?: (arg) => void; // 更新出错
}) => {
  ipcRenderer.once(UPDATE_CHECKING, (_, arg) => onChecking(arg));
  ipcRenderer.once(UPDATE_AVAILABLE, (_, arg) => onAvailable(arg));
  ipcRenderer.once(UPDATE_NOT_AVAILABLE, (_, arg) => onNoAvailable(arg));
  ipcRenderer.once(UPDATE_ERROR, (_, arg) => onError(arg));
  ipc(UPDATE_CHECK);
};

/**
 * 下载更新
 * @param param0
 */
export const downloadUpdate = ({
  onProgress = noop,
  onDownloaded = noop,
  onError = noop,
}: {
  onProgress?: (arg) => void; // 更新进度
  onDownloaded?: (arg) => void; // 下载完成
  onError?: (arg) => void; // 更新出错
}) => {
  ipcRenderer.once(UPDATE_ERROR, (_, arg) => onError(arg));
  ipcRenderer.once(UPDATE_DOWNLOADING, (_, arg) => onProgress(arg));
  ipcRenderer.once(UPDATE_DOWNLOADED, (_, arg) => {
    isUpdateDownloaded = true;
    onDownloaded(arg);
  });
  ipc(UPDATE_DOWNLOAD);
};

/**
 * 安装更新
 */
export const installUpdate = () => {
  if (!isUpdateDownloaded) return;
  isUpdateDownloaded = false;
  void [
    UPDATE_CHECKING,
    UPDATE_AVAILABLE,
    UPDATE_NOT_AVAILABLE,
    UPDATE_ERROR,
    UPDATE_DOWNLOADING,
    UPDATE_DOWNLOADED,
  ].forEach((type) => ipcRenderer.removeAllListeners(type));
  ipc(UPDATE_INSTALL);
};
