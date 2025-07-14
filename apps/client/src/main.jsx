import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/theme/provider";
import { AuthProvider } from "./context/auth/authProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
