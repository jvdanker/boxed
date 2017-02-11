const electron = require('electron');
const virtualbox = require('virtualbox');
const {ipcMain} = require('electron');
const menubar = require('menubar')
const path = require('path');
const url = require('url');
const spawn = require('child_process').spawn;
const {webContents} = require('electron');

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
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#002b36'
    });

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
    // TODO refresh status of machines and send to renderer
});

mb.on('after-show', function() {
    //mb.window.openDevTools();
});

mb.on('ready', function ready () {
    // do nothing?
});

// TODO move to different file
ipcMain.on('/api/machines', (event, arg) => {
  virtualbox.list(function list_callback(machines, error) {
      // if (error) res.send(error);
      event.sender.send('/api/machines', machines);
  });
});

ipcMain.on('/api/quit', (event, arg) => {
    app.quit();
});

ipcMain.on('/api/start', (event, arg) => {
    var prc = spawn('VBoxManage',  ['startvm', arg.key, '--type', 'gui']);

    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', (data) => {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });

    prc.stdout.on('error', (err) => {
        console.log(err);
    });

    prc.on('close', (code) => {
        console.log('process exit code ' + code);
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