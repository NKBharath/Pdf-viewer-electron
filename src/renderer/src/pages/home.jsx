import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePdf } from '../context/PdfSelectContext';
function Home() {
  const [pdfPaths, setPdfPaths] = useState([]);
  const [selectedPdfPaths, setSelectedPdfPaths] = useState([]);
  const { setPdfDataList } = usePdf();
  const navigate = useNavigate();

  const handleSelectFolders = async () => {
    if (!window.electronAPI) {
      alert('Electron API not available');
      return;
    }
    const paths = await window.electronAPI.selectFolders();
    setPdfPaths(paths);
  };

  const handlePdfSelect = (file) => {
  setSelectedPdfPaths((prev) =>
    prev.some((f) => f.path === file.path) ? prev : [...prev, file]
  );
};

 const handleContinue = () => {
  if (selectedPdfPaths.length === 0) {
    alert('No PDFs selected');
    return;
  }
  console.log(selectedPdfPaths);
  setPdfDataList(selectedPdfPaths);
  navigate("/selected");

};


  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">📂 Select PDF Folder</h1>

      <button onClick={handleSelectFolders}>
        Browse Folder
      </button>

      <table className="w-full text-left border-t border-gray-600">
        <thead>
          <tr>
            <th className="p-2">S.no</th>
            <th className="p-2">✅</th>
            <th className="p-2">File Name</th>
          </tr>
        </thead>
        <tbody>
          {pdfPaths.map((filePath, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <button onClick={() => handlePdfSelect(filePath)} >
                  Select
                </button>
              </td>
              <td className="p-2"> {filePath.name} </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleContinue}> Continue </button>
    </div>
  );
}

export default Home;
