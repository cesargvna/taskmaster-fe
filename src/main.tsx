import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AxiosInterceptor } from "./interceptors/axios.interceptor.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
AxiosInterceptor();

function render(): void {
  const rootElement: HTMLElement | null = document.getElementById("root");
  const root = createRoot(rootElement!);
  root.render(
    <StrictMode>
      <ToastContainer />
      <App />
    </StrictMode>,
  );
}
render();
