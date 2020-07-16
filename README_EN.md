# electron-react-boilerplate

### A boilerplate for developing Electron App with React and TypeScript

[![Build Status](https://travis-ci.org/justemit/electron-react-boilerplate.svg?branch=master)](https://travis-ci.org/justemit/electron-react-boilerplate)

## Screenshot

![electron-react-boilerplate](https://user-images.githubusercontent.com/26452939/50197324-88a9ba80-0381-11e9-93a4-3db3dfd08433.png)

## Install

> I recomment you to use the [`q-cli`](https://github.com/fantasticit/q-cli) to generate project with this boilerplate.

1.  clone the repo via git:

```bash
git clone --depth=1 https://github.com/fantasticit/electron-react-boilerplate.git your-project-name
```

2. install dependencies with npm(or yarn).

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

If you want alter the icon, you can edit the `package.json`:

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

To alter the app's name, just edit the `index.html`'s title.

## Module Structure

In develeopment, this boilerpolate uses two process to run app. One is `main process`, anoter is `renderer process`. If you edit the `src/main/index.js`, the electron will restart automatically, and you can see information in the console. As same, edit the `src/renderer`, the app's UI will hot update.

## License

MIT
