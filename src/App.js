import "./App.css";
import React, { useState } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Shelves from "./components/Shelves/Shelves";
import Navbar from "./components/navbar/Navbar";
import { useGlobalContext } from "./context";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route Route path="/shelves/:shelfId" element={<Shelves />} />
        </Route>
      </Routes>
    </div>
  );
}

export { App };
