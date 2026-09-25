const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    autoHideMenuBar: true, // Makes it look like a sleek native app
    icon: path.join(__dirname, 'src', 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // 🔥 THIS COMPLETELY DISABLES CORS! 🔥
    }
  });

  mainWindow.loadFile('src/live-tv.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
