import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron';
import { WINDOW_OPEN, WINDOW_CLOSE, WINDOW_PREVENT_CLOSE } from './constants';
import { getType } from './utils';

const createWindow = ({ name, url, width = 1096, height = 728, ...rest }, onClose) => {
  const webPreferences = {
    nodeIntegration: true,
  };

  rest.webPreferences = Object.assign({}, webPreferences, rest.webPreferences || {});

  const options: BrowserWindowConstructorOptions & { name?: string } = {
    name,
    width,
    height,
    show: false,
    ...rest,
  };

  if (!(rest.parent || rest.modal)) {
    let x, y;
    const currentWindow = BrowserWindow.getFocusedWindow(); //获取当前活动的浏览器窗口。
    if (currentWindow) {
      // 如果上一步中有活动窗口，则根据当前活动窗口的右下方设置下一个窗口的坐标
      const [currentWindowX, currentWindowY] = currentWindow.getPosition();
      x = currentWindowX + 40;
      y = currentWindowY + 40;
    }
    options.x = x;
    options.y = y;
  }

  let newWindow = new BrowserWindow(options);
  newWindow['name'] = options.name.toLowerCase();
  newWindow.loadURL(url);
  newWindow.once('ready-to-show', () => {
    newWindow.show();
  });
  newWindow.on('closed', () => {
    onClose();
    newWindow = null;
  });
  return newWindow;
};

export class WindowsManager {
  private windows: Map<string, BrowserWindow | Set<BrowserWindow>>;
  private config: Record<string, any>;

  constructor(config) {
    this.windows = new Map();
    this.config = config;
    this.detectIpcMain();
    return this;
  }

  private detectIpcMain(): void {
    ipcMain.on(WINDOW_OPEN, async (evt, arg) => {
      const { name } = arg;
      this.show(name);
      evt.sender.send('success');
    });
    ipcMain.on(WINDOW_CLOSE, async (evt, arg) => {
      const { name } = arg;
      this.close(name);
      evt.sender.send('success');
    });
    ipcMain.on(WINDOW_PREVENT_CLOSE, (_, arg) => {
      const window = this.windows.get(arg.name);
      const prevent = (window) => {
        window.on('close', (evt) => {
          evt.preventDefault();
        });
      };
      if (getType(window) === 'set') {
        Array.from(window as Set<BrowserWindow>).forEach(prevent);
      } else {
        prevent(window);
      }
    });
  }

  getAllWindows(): Array<BrowserWindow> {
    return [...this.windows.keys()].reduce((all, name) => {
      const windowOrSet = this.windows.get(name);
      if (getType(windowOrSet) === 'set') {
        all.push.apply(all, Array.from(windowOrSet as Set<BrowserWindow>));
      } else {
        all.push(windowOrSet);
      }
      return all;
    }, []);
  }

  show(name): BrowserWindow {
    const config = this.config[name];

    // 父子窗口 https://www.electronjs.org/docs/api/browser-window#%E7%88%B6%E5%AD%90%E7%AA%97%E5%8F%A3
    if (config.parent) {
      const parent = this.windows.get(config.parent);
      if (parent && getType(parent) !== 'set') {
        config.parent = parent;
      }
    }

    let window;
    let hasCreated = false;

    if (this.windows.has(name)) {
      if (config.multiple) {
        const set = this.windows.get(name) as Set<BrowserWindow>;
        window = createWindow(config, () => {
          set.delete(window);
        });
        set.add(window);
      } else {
        window = this.windows.get(name);
        hasCreated = true;
      }
    } else {
      if (config.multiple) {
        const set = new Set<BrowserWindow>();
        window = createWindow(config, () => {
          set.delete(window);
        });
        set.add(window);
        this.windows.set(name, set);
      } else {
        window = createWindow(config, () => {
          this.windows.delete(name);
        });
        this.windows.set(name, window);
      }
    }

    window.once('did-finish-load', () => {
      window.show();
      window.focus();
    });

    if (hasCreated) {
      window.show();
      window.focus();
    }

    return window;
  }

  close(name): void {
    if (!this.windows.has(name)) return;
    const close = (window) => {
      if (window.isClosable()) {
        window.close();
      }
    };
    const windowOrSet = this.windows.get(name);
    if (getType(windowOrSet) === 'set') {
      (windowOrSet as Set<BrowserWindow>).forEach(close);
    } else {
      close(windowOrSet);
    }
    this.windows.delete(name);
  }

  closeAll(current): void {
    void [...this.windows.keys()].filter((name) => name !== current).forEach(this.close.bind(this));
  }
}
