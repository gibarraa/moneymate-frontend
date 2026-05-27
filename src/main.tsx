import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import { FinanceProvider } from "@/context/FinanceContext";
import { ToastProvider } from "@/context/ToastContext";
import { RouterProvider } from "@/routes/RouterProvider";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <ToastProvider>
        <AuthProvider>
          <FinanceProvider>
            <App />
          </FinanceProvider>
        </AuthProvider>
      </ToastProvider>
    </RouterProvider>
  </StrictMode>,
);
