import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/theme/provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
