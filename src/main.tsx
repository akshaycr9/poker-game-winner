import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChipValuesProvider } from "./contexts/ChipValuesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChipValuesProvider>
      <App />
    </ChipValuesProvider>
  </StrictMode>
);
