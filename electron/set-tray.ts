import { Menu, Tray } from 'electron';
import path from 'path';

let tray = null;

export const setTray = () => {
  tray = new Tray(path.join(__dirname, '../resources/tray.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
};
