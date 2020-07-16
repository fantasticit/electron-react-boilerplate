import React from 'react';
import Hero from './components/hero';
import style from './App.module.scss';
import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <header>
          <Hero />
          <p>使用 Electron 和 React 构建跨平台的桌面应用</p>
        </header>
        <p>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
