import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#192540",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
          },
          success: {
            style: { background: "#10B981" },
            iconTheme: { primary: "#fff", secondary: "#10B981" },
          },
          error: {
            style: { background: "#EF4444" },
            iconTheme: { primary: "#fff", secondary: "#EF4444" },
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);

