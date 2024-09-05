import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { IdProvider } from "./context/IdContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketMessageProvider } from "./context/SocketMessageContext.jsx";
import {  BrowserRouter as Router  } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <IdProvider>
        <SocketMessageProvider>
         <SocketProvider>
            <Router>
              <App />
              </Router>
         </SocketProvider>
          <ToastContainer />
        </SocketMessageProvider>
      </IdProvider>
    </AuthProvider>
  </React.StrictMode>
);
