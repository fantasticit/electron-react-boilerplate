import React, { useCallback, useState } from 'react';
import { checkUpdate, installUpdate, downloadUpdate } from 'electron-utils/update';
import Hero from './components/hero';
import style from './App.module.scss';
import './App.scss';

const App = () => {
  const [checking, setChecking] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [availableInfo, setAvailableInfo] = useState(null);
  const [notAvailableInfo, setNotAvailableInfo] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  const check = useCallback(() => {
    checkUpdate({
      onChecking(arg) {
        setChecking(true);
        console.log('checking', arg);
      },
      onAvailable(arg) {
        setChecking(false);
        setAvailableInfo(arg);
        console.log('available', arg);
      },
      onNoAvailable(arg) {
        setChecking(false);
        setNotAvailableInfo(arg);
        console.log('not available', arg);
      },
      onError(error) {
        setError(error);
        console.error(error);
      },
    });
  }, []);

  const download = useCallback(() => {
    downloadUpdate({
      onDownloaded(arg) {
        console.log('downloaded', arg);
        setDownloaded(true);
      },
      onError(error) {
        setError(error);
        console.error('download', error);
      },
      onProgress(progress) {
        setProgress(progress);
        console.log('progress', progress);
      },
    });
  }, []);

  return (
    <div className={style.app}>
      <header>
        <Hero />
        <p>使用 Electron 和 React 构建跨平台的桌面应用 demo</p>
      </header>
      <h3>更新界面</h3>
      <div>
        <button onClick={check}>检查更新</button>
        <button onClick={download}>下载更新</button>
        <button
          disabled={!downloaded}
          onClick={() => {
            installUpdate();
          }}
        >
          安装更新
        </button>
      </div>
      <p>
        To get started, edit <code>src/update/App.tsx</code> and save to reload.
      </p>
      <div className={style.infoWrapper}>
        {checking && <div>检查更新中...</div>}
        {error && (
          <div>
            <h4>出错信息：</h4>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        {availableInfo && (
          <div>
            <h4>更新可用：</h4>
            <pre>{JSON.stringify(availableInfo, null, 2)}</pre>
          </div>
        )}
        {notAvailableInfo && (
          <div>
            <h4>无可用更新：</h4>
            <pre>{JSON.stringify(notAvailableInfo, null, 2)}</pre>
          </div>
        )}
        {progress && (
          <div>
            <h4>下载进度：</h4>
            <pre>{JSON.stringify(progress, null, 2)}</pre>
          </div>
        )}
        {downloaded && <div>下载完成</div>}
      </div>
    </div>
  );
};

export default App;
