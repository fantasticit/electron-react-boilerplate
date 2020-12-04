import React, { useCallback, useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { beforeWindowClose } from 'electron-utils/window';
import style from './App.module.scss';
import './App.scss';

const App = () => {
  const [images, setImages] = useState([]);

  const listener = useCallback((_, arg) => {
    console.log(arg);
    setImages(arg.img || []);
  }, []);

  useEffect(() => {
    ipcRenderer.on('picture:view', listener);
    return () => {
      ipcRenderer.removeListener('picture:view', listener);
    };
  }, []);

  useEffect(() => {
    beforeWindowClose(() => {
      return new Promise((resolve) => {
        const value = confirm('确认关闭？');
        resolve(value);
      });
    });
  }, []);

  return (
    <div className={style.app}>
      <h3>图片查看窗口</h3>
      {images.map((img) => (
        <img key={img} src={img} />
      ))}
    </div>
  );
};

export default App;
