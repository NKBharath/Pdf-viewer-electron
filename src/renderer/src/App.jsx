import { PdfProvider } from './context/PdfSelectContext';
import SelectedPdf from './pages/Selected.Pdf';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'; 
function App() {
  return (
    <PdfProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selected" element={<SelectedPdf />} />
      </Routes>
    </PdfProvider>
  );
}

export default App;