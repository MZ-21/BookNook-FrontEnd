import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Shelves from "./components/Shelves/Shelves";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Signout from "./components/signout/Signout";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route element={<Layout />}>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected */} 
          <Route element={<ProtectedRoute />}>
            <Route path="/shelves" element={<div>Select a shelf</div>} />
            <Route path="/shelves/:shelfId" element={<Shelves />} />

            {/* signout route */}
            <Route path="/signout" element={<Signout />}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export { App };
