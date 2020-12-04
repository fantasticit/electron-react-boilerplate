import React from 'react';
import { openWindow, closeWindow, sendToWindow } from 'electron-utils/window';
import Hero from './components/hero';
import style from './App.module.scss';
import './App.scss';

const DEFAULT_IMG =
  'https://user-images.githubusercontent.com/26452939/100304935-dce05f00-2fda-11eb-98f5-5af5bfd46a1a.gif';

export default class App extends React.Component {
  state = {
    img: DEFAULT_IMG,
  };

  open = (name) => {
    openWindow(name).then(() => console.log('ok'));
  };

  close = (name) => {
    closeWindow(name).then(() => console.log('ok'));
  };

  viewPicture = () => {
    openWindow('picture').then(() => {
      sendToWindow('picture', 'picture:view', { img: [this.state.img] });
    });
  };

  render() {
    return (
      <div className={style.app}>
        <header>
          <Hero />
          <p>使用 Electron 和 React 构建跨平台的桌面应用</p>
        </header>
        <div style={{ marginTop: 30 }}>
          <button className="primary" onClick={() => this.open('update')}>
            打开更新窗口
          </button>
          <button onClick={() => this.close('update')}>关闭更新窗口</button>
          <span style={{ margin: '0 1.5rem', color: '#eee' }}></span>
          <button className="primary" onClick={() => this.open('multiple')}>
            打开可多开窗口
          </button>
          <button onClick={() => this.close('multiple')}>关闭所有多开窗口</button>
        </div>
        <div style={{ marginTop: 20 }}>
          <input
            type="text"
            value={this.state.img}
            onChange={(e) => this.setState({ img: e.target.value })}
          />
          <button style={{ marginLeft: 16 }} onClick={this.viewPicture}>
            查看图片
          </button>
        </div>
        <p>
          To get started, edit <code>src/main/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
