import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/theme/provider";
import { AuthProvider } from "./context/auth/authProvider.jsx";
import { SocketProvider } from "./context/socket/socketProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import { CheckoutProvider } from "./context/checkout/checkoutContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CheckoutProvider>
        <ThemeProvider>
          <HelmetProvider>
            <AuthProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </AuthProvider>
          </HelmetProvider>
        </ThemeProvider>
      </CheckoutProvider>
    </Provider>
  </StrictMode>
);
