const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  });
 
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(createWindow);

ipcMain.handle('select-folders', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'multiSelections' ]
  });

  if (result.canceled) return [];

  const pdfPaths = [];

  for (const folder of result.filePaths) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.pdf')) {
        pdfPaths.push(path.join(folder, file));
      }
    }
  }

  return pdfPaths;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
