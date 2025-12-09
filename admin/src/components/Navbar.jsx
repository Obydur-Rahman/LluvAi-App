import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../context/AdminContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { setToken, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setToken(null);
    setAdmin(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>Admin Panel</h2>
          <span className="subtitle">Payment Management</span>
        </div>

        <div className="navbar-right">
          <span className="admin-email">{adminEmail}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
