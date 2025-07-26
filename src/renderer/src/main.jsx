import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { PdfProvider } from "./context/PdfSelectContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <PdfProvider>
        <App />
      </PdfProvider>
    </HashRouter>
  </React.StrictMode>
);
