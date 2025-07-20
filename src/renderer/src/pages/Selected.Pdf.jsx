import { usePdf } from "../context/PdfSelectContext";

function SelectedPdf() {
  const { pdfDataList } = usePdf();
    console.log("Selected PDFs:", pdfDataList);

  if (!pdfDataList || pdfDataList.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>📄 Selected PDFs</h1>
        <p>No PDFs selected</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Selected PDFs</h1>
      <ul>
        {pdfDataList.map((pdf, index) => (
          <li key={index} style={{ marginBottom: "10px", fontSize: "18px" }}>
            {pdf.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedPdf;
