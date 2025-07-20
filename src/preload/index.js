const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolders: () => ipcRenderer.invoke('select-folders'),

  // 👇 ADD THIS if you're calling this in your frontend
  getSelectedPdfBase64: (paths) => ipcRenderer.invoke('get-selected-pdf-base64', paths),

});
