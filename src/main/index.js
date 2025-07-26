const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      webSecurity: true,
      nodeIntegration: false,
      allowRunningInsecureContent: false,
    }
  });

  win.loadURL('http://localhost:5173'); 
}

app.whenReady().then(createWindow);

ipcMain.handle('select-folders', () => {
  const result = dialog.showOpenDialogSync({
    properties: ['openDirectory']
  });

  if (!result || result.length === 0) return [];

  const pdfFiles = [];

  for (const folder of result) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.pdf')) {
        pdfFiles.push({
          name: file,
          path: path.join(folder, file)
        });
      }
    }
  }

  return pdfFiles;
});

ipcMain.handle("get-pdf-by-path", async (event, filePath) => {
  const fs = require("fs");

  if (fs.existsSync(filePath)) {
    const buffer = fs.readFileSync(filePath);
    return buffer.toString("base64");
  }
  return null;
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
