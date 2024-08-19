import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { IdProvider } from "./context/IdContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <IdProvider>
        <App />
      </IdProvider>
    </AuthProvider>
  </React.StrictMode>
);
