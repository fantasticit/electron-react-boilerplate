import { setUp } from './set-up';
import { setMenu } from './set-menu';
import { setTray } from './set-tray';
import { setUpdate } from './set-update';
import { setTouchbar } from './set-touchbar';
import { setDockMenu } from './set-dock-menu';

setUp().then(({ windowsManger, mainWindow }) => {
  setMenu();
  setTray();
  setUpdate(windowsManger);
  setTouchbar(mainWindow);
  setDockMenu();
});
