# electron-react-boilerplate

> [English](./README_EN.md)

### 使用 React.js 开发 Electron App 应用

[![Build Status](https://travis-ci.org/justemit/electron-react-boilerplate.svg?branch=master)](https://travis-ci.org/justemit/electron-react-boilerplate)

## 截图

![electron-react-boilerplate](https://user-images.githubusercontent.com/26452939/100304935-dce05f00-2fda-11eb-98f5-5af5bfd46a1a.gif)

## 特性

- 支持 React：各窗口均采用 React 开发，也可根据需要更改为其他框架
- 支持多窗口：修改 `erb.config.js` 中 windows 配置（配置和 electron BrowserWindows 构造参数一致）
- 支持 Touchbar：可根据需要在 `electron/set-touchbar.ts` 更改
- 支持 Tray：可根据需要在 `electron/set-tray.ts` 更改
- 支持 Dock：可根据需要在 `electron/set-dock-menu` 更改
- 支持更新：`package.json` 中的 `build` 配置

## 安装

1.  使用 git clone:

```bash
git clone --depth=1 https://github.com/fantasticit/electron-react-boilerplate.git your-project-name
```

2.  安装依赖

```bash
cd your-project-name
npm install
```

## 运行

开发模式下,运行本项目会开启一个 `renderer` 进程(支持模块热替换,即: **hot-module-replacement**)和一个 `electron` 主进程.

```bash
npm run dev
```

端口默认为: `8080`,如果需要指定其他端口,命令如下:

```bash
npm run dev other-port // such as npm run dev 9090
```

## 测试

本项目使用 `Jest` 进行测试:

```bash
npm test
```

编辑 `jest.config.js` 以更改测试配置.

## 打包

运行:

```bash
npm run build
```

编辑 `package.json` 中相关字段,可以使用其他图标:

```json
"build": {
  "mac": {
    "icon": "icons/icon.icns"
  },
  "win": {
    "icon": "icons/icon.ico"
  },
  "linux": {
    "icon": "icons"
  }
}
```

修改 `index.html` 的标题,即可修改打包后 App 名称.

## License

MIT
