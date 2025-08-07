import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter } from "react-router";
import { PopUpProvider } from "./contexts/PopUpContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PopUpProvider>
          <App />
        </PopUpProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
