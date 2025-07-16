import { useState } from 'react';

function App() {
  const [pdfPaths, setPdfPaths] = useState([]);

  const handleSelectFolders = async () => {
    if (!window.electronAPI) {
      alert("Electron API not available");
      return;
    }

    const paths = await window.electronAPI.selectFolders();
    setPdfPaths(paths);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📁 PDF Folder Viewer</h1>
      <button
        onClick={handleSelectFolders}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Display Folder
      </button>

      <h2>📄 PDF Files:</h2>
      {pdfPaths.length === 0 ? (
        <p>No PDFs found. Select a folder above.</p>
      ) : (
        <ul>
          {pdfPaths.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
