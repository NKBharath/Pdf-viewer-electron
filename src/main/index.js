const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(createWindow)

ipcMain.handle('select-folders', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })

  if (!result.canceled) {
    const folderPath = result.filePaths[0]
    const pdfFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => path.join(folderPath, file))

    return pdfFiles
  }

  return []
})

ipcMain.handle('get-selected-pdf-base64', async (event, paths) => {
  const results = []

  for (const filePath of paths) {
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath)
      results.push({
        name: path.basename(filePath),
        data: buffer.toString('base64')
      })
    }
  }

  return results
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
