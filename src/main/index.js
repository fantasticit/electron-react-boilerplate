const { app, BrowserWindow } = require('electron')

let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    show: false
  })

  const winURL = process.env.NODE_ENV === 'production' ? `file://${__dirname}/index.html` : 'http://localhost:8080'
  mainWindow.loadURL(winURL)

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('close', () => (mainWindow = null))
})

app.on('window-all-close', () => process.platform !== 'darwin' && app.quit())
