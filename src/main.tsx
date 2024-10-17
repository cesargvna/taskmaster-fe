import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function render(): void {
  const rootElement: HTMLElement | null = document.getElementById("root");
  const root = createRoot(rootElement!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
render();
