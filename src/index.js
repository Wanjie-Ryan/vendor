import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RegContextProvider } from "./context/regContext";
import { LogContextProvider } from "./context/logContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegContextProvider>
      <LogContextProvider>
        <App />
      </LogContextProvider>
      <ToastContainer className="toast-container" />
    </RegContextProvider>
  </React.StrictMode>
);
