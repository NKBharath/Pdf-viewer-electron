import { usePdf } from "../context/PdfSelectContext";

function SelectedPdf() {
  const { pdfDataList } = usePdf();

  if (!pdfDataList || pdfDataList.length === 0) {
    return <p>No PDFs selected.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Selected PDFs</h1>
      {pdfDataList.map((pdf, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <h3>{pdf.name}</h3>
          <iframe
            src={`file://${pdf.path}`}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            title={pdf.name}
          />
        </div>
      ))}
    </div>
  );
}

export default SelectedPdf;
