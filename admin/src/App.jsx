import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContext from "./context/AdminContext";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setAdmin({ isLoggedIn: true });
    }
    setLoading(false);
  }, [token]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <AdminContext.Provider value={{ admin, setAdmin, token, setToken }}>
      <Router>
        <ToastContainer position="top-right" />
        {token && <Navbar />}
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={token ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </AdminContext.Provider>
  );
}

export default App;
