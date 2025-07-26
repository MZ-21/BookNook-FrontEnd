import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import "../components/Layout.css";
import Navbar from "./navbar/Navbar";
import { ShelvesPanel } from "./shelves-panel/ShelvesPanel";
import { useGlobalContext } from "../context";

const Layout = () => {
  const { leftPanelOpen } = useGlobalContext();
  return (
    <>
      <div className="body-container">
        {leftPanelOpen && <ShelvesPanel />}
        <main>
          <Outlet />
          {/* renders current route selected */}
        </main>
      </div>
    </>
  );
};

export default Layout;
