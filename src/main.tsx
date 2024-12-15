import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./00_app/App";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
