import React from 'react';
import Hero from './components/hero';
import style from './App.module.scss';
import './App.scss';
import { beforeWindowClose } from 'electron-utils/window';

export default class App extends React.Component {
  componentDidMount() {
    beforeWindowClose(() => {
      return new Promise((resolve, reject) => {
        const value = confirm('确认关闭？');
        resolve(value);
      });
    });
  }
  render() {
    return (
      <div className={style.app}>
        <header>
          <Hero />
          <p>使用 Electron 和 React 构建跨平台的桌面应用 demo</p>
        </header>
        <h3>可多开窗口</h3>
        <p>
          To get started, edit <code>src/multiple/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
