
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, HashRouter, MemoryRouter } from "react-router-dom";
import { PdfProvider } from "./context/PdfSelectContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PdfProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
   </PdfProvider>
  </React.StrictMode>
);
