import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminContext from "../context/AdminContext";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAdmin, setToken } = useContext(AdminContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password }
      );

      if (response.data.success && response.data.user.isAdmin) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminEmail", email);
        setToken(response.data.token);
        setAdmin({ isLoggedIn: true, email });
        toast.success("Admin Login Successful!");
        window.location.href = "/dashboard";
      } else {
        toast.error("You are not authorized as admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        <p>Payment Management System</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="test-credentials">
          <p>
            <strong>Test Admin Credentials:</strong>
          </p>
          <p>Email: admin@test.com</p>
          <p>Password: password123</p>
          <small>(Set isAdmin: true in MongoDB first)</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
