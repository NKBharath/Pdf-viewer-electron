const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolders: () => ipcRenderer.invoke("select-folders"),
  getPdfByPath: (filePath) => ipcRenderer.invoke("get-pdf-by-path", filePath),
});
