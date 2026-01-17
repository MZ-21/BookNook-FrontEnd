import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./context/context.jsx";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Renders once near root, creates single auth state, every component inside can access it */}
        <AppContext>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AppContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
