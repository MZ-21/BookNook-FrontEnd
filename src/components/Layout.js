import { Outlet } from "react-router-dom";
import "../components/Layout.css";
import { ShelvesPanel } from "./shelves-panel/ShelvesPanel";
import { useGlobalContext } from "../context/context";
import Navbar from "./navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { leftPanelOpen } = useGlobalContext();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="body-container">
        {user && leftPanelOpen && <ShelvesPanel />}
        <main>
          <Outlet />
          {/* renders current route selected */}
        </main>
      </div>
    </>
  );
};

export default Layout;
