const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

if (require('electron-squirrel-startup')) app.quit();

const M3U_URL = 'https://raw.githubusercontent.com/drmlive/fancode-live-events/main/fancode.m3u';
const LOCAL_FILE = path.join(__dirname, 'fancode.m3u');

function downloadPlaylist() {
  https.get(M3U_URL, (res) => {
    const file = fs.createWriteStream(LOCAL_FILE);
    res.pipe(file);
  }).on('error', (err) => console.error(err));
}

// Download instantly on boot, then every 5 minutes
downloadPlaylist();
setInterval(downloadPlaylist, 5 * 60 * 1000);

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
