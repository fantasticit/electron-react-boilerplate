# electron-react-boilerplate

### A boilerplate for developing Electron App with React and TypeScript

[![Build Status](https://travis-ci.org/justemit/electron-react-boilerplate.svg?branch=master)](https://travis-ci.org/justemit/electron-react-boilerplate)

## Screenshot

![electron-react-boilerplate](http://pcj3271t7.bkt.clouddn.com/electron-react-boilerplate.png)

## Install

> I recomment you to use the [`hy-cli`](https://github.com/justemit/hy-cli) to generate project with this boilerplate.

1.  clone the repo via git:

```bash
git clone --depth=1 https://github.com/justemit/electron-react-boilerplate.git ypur-project-name
```

2.  install dependencies with npm(or yarn).

```bash
cd your-project-name
npm install
```

## Run

Start the app in the `dev` enviroment. This starts the renderer proess in **hot-module-replacement** mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
npm run dev
```

The app will run at `http://localhost:8080` default, if you want to run it at other port, just run:

```bash
npm run dev other-port // such as npm run dev 9090
```

## Test

The project uses `Jest` to test:

```bash
npm test
```

If you want to change the test config, edit the `jest.config.js`.

## Packaging

To package the app:

```bash
npm run build
```

If you want alter the icon or the app's name, you can edit the `package.json`:

```json
"name": "electron-react-boilerplate", // app name
"build": {
  // icons here
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

## Module Structure

In develeopment, this boilerpolate uses two process to run app. One is `main process`, anoter is `renderer process`. If you edit the `src/main/index.js`, the electron will restart automatically, and you can see information in the console. As same, edit the `src/renderer`, the app's UI will hot update.

## License

MIT
