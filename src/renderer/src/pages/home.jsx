import { useNavigate } from "react-router-dom";
import { usePdf } from "../context/PdfSelectContext";
import { useState } from "react";

function Home() {
  const [pdfPaths, setPdfPaths] = useState([]);
  const [selectedPdfPaths, setSelectedPdfPaths] = useState([]);
  const { setPdfDataList } = usePdf(); // from context
  const navigate = useNavigate();

  const handleSelectFolders = async () => {
    if (!window.electronAPI) {
      alert("Electron API not available");
      return;
    }

    const paths = await window.electronAPI.selectFolders();
    setPdfPaths(paths);
  };

  const handlePdfSelect = (pdfPath) => {
    setSelectedPdfPaths((prev) => [...prev, pdfPath]);
  };

  const handleContinue = async () => {
    if (selectedPdfPaths.length === 0) {
      alert("No files selected!");
      return;
    }
    console.log("Selected PDF Paths:", selectedPdfPaths);
    // Ask Electron to send base64 content of selected files
    const pdfData = await window.electronAPI.getSelectedPdfBase64(selectedPdfPaths);

    // Store in context
    setPdfDataList(pdfData);
    localStorage.setItem("pdfDataList", JSON.stringify(pdfData));


    setTimeout(() => {
    navigate("/selected");
  }, 100);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#f0f0f0" }}>
      <h1>📁 PDF Folder Viewer</h1>
      <button onClick={handleSelectFolders}>Display Folder</button>

      <h2>📄 PDF Files:</h2>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>✅</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pdfPaths.map((file, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <button onClick={() => handlePdfSelect(file)}>Select</button>
              </td>
              
            <td>
              {typeof file === "string"
              ? file.split(/[\\/]/).pop()
              : file?.path?.split(/[\\/]/).pop() || "Unnamed"}
            </td>


            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}

export default Home;
