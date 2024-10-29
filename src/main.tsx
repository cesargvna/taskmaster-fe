import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AxiosInterceptor } from "./interceptors/axios.interceptor.tsx";
AxiosInterceptor();

function render(): void {
  const rootElement: HTMLElement | null = document.getElementById("root");
  const root = createRoot(rootElement!);
  root.render(<App />);
}
render();
