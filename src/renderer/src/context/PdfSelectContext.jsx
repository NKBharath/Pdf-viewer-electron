import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [pdfDataList, setPdfDataList] = useState([]);

  return (
    <PdfContext.Provider value={{ pdfDataList, setPdfDataList }}>
      {children}
    </PdfContext.Provider>
  );
};



export const usePdf = () => useContext(PdfContext);
