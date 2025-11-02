import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FileProvider } from './pages/FileContext.jsx';
// import { FileProvider } from ".pages/FileContext";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </StrictMode>
);
