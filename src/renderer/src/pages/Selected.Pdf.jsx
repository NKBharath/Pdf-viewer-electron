import { useEffect, useRef } from "react";
import { usePdf } from "../context/PdfSelectContext";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"; 

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

function SelectedPdf() {
  const { pdfDataList } = usePdf();
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPdf = async () => {
      const pdf = pdfDataList[0];
      const canvas = canvasRef.current;

      try {
        const base64 = await window.electronAPI.getPdfByPath(pdf.path);
        const binary = atob(base64);
        const uint8Array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          uint8Array[i] = binary.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const doc = await loadingTask.promise;
        const page = await doc.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");

        await page.render({ canvasContext: context, viewport }).promise;
        console.log("✅ Page rendered.");
      } catch (err) {
        console.error("❌ Error rendering PDF:", err);
      }
    };

    renderPdf();
  }, [pdfDataList]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Selected PDFs</h1>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          maxWidth: "800px",
          border: "1px solid #ccc",
          backgroundColor: "#111",
        }}
      />
    </div>
  );
}

export default SelectedPdf;
