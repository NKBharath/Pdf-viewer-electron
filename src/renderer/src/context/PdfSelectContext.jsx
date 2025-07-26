import { createContext, useContext, useState } from "react";

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [pdfDataList, setPdfDataList] = useState(() => {
  const saved = localStorage.getItem("pdfDataList");
  return saved ? JSON.parse(saved) : [];
});
  
  return (
    <PdfContext.Provider value={{ pdfDataList, setPdfDataList }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => useContext(PdfContext);
