const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('enable-overlay-scrollbar')

const url = require('url')
const config = require('../../config/main')
const rendererConfig = require('../../config/renderer')

let mainWindow

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 1025,
    height: 769
  })

  let urlPath
  if (process.env.NODE_ENV === 'development') {
    urlPath = url.format(config.dev)

    require('devtron').install()
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Installing ${name}`))
      .catch((error) => console.log('Installing ', error))

    mainWindow.webContents.openDevTools()
  } else {
    urlPath = url.format({
      pathname: rendererConfig.build.index,
      protocol: 'file:',
      slashes: true
    })
  }

  mainWindow.loadURL(urlPath)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})
