# electron-react-boilerplate

> [English](./README_EN.md)

### 使用 React.js 开发 Electron App 应用

[![Build Status](https://travis-ci.org/justemit/electron-react-boilerplate.svg?branch=master)](https://travis-ci.org/justemit/electron-react-boilerplate)

## 截图

![electron-react-boilerplate](http://pcj3271t7.bkt.clouddn.com/electron-react-boilerplate.png)

## 安装

> 可以试一下使用 [`q-cli`](https://github.com/justemit/q-cli)

1.  使用 git clone:

```bash
git clone --depth=1 https://github.com/justemit/electron-react-boilerplate.git ypur-project-name
```

2.  安装依赖

```bash
cd your-project-name
npm install
```

此外,如果使用 [`q-cli`](https://github.com/justemit/q-cli),则仅需:

```shell
q-cli init your-project-name

# 接下来选择模板时选择本项目即可
```

## 运行

开发模式下,运行本项目会开启一个 `renderer` 进程(支持模块热替换,即: **hot-module-replacement**)和一个 `electron` 主线程.

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
