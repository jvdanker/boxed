const electron = require('electron');
const virtualbox = require('virtualbox');
const {ipcMain} = require('electron');
const menubar = require('menubar')
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const mb = menubar({
    index: url.format({
        pathname: path.join(__dirname, 'public/test.html'),
        protocol: 'file:',
        slashes: true
    }),
    preloadWindow: true});

let mainWindow;

function createWindow () {
  // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#002b36'
    });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/test.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

mb.on('show', function() {
    console.log('show');
});

ipcMain.on('/api/machines', (event, arg) => {
  console.log(arg);

  virtualbox.list(function list_callback(machines, error) {
      // if (error) res.send(error);
      event.sender.send('/api/machines', machines);
  });

});

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg);  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong1');
});

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) ; // prints "ping"
  event.returnValue = 'pong2';
});

mb.on('ready', function ready () {
  console.log('app is ready');
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});