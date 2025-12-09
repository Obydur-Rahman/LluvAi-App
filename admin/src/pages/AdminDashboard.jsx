import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminContext from "../context/AdminContext";
import PaymentCard from "../components/PaymentCard";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const { token } = useContext(AdminContext);

  const fetchPendingPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPendingPayments();
    }
  }, [token]);

  const handleApprove = async (paymentId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/approve`,
        {
          paymentId,
          adminNotes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Payment Approved! Credits added to user.");
        setSelectedPayment(null);
        setAdminNotes("");
        fetchPendingPayments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve payment");
    }
  };

  const handleReject = async (paymentId) => {
    if (!window.confirm("Are you sure you want to reject this payment?"))
      return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/reject`,
        {
          paymentId,
          adminNotes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Payment Rejected!");
        setSelectedPayment(null);
        setAdminNotes("");
        fetchPendingPayments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject payment");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Payment Management Dashboard</h1>
        <p>Review and approve/reject pending payment requests</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Pending Payments</h3>
          <p className="stat-number">{payments.length}</p>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading payments...</div>
      ) : payments.length === 0 ? (
        <div className="no-payments">
          <p>No pending payments</p>
        </div>
      ) : (
        <div className="payments-grid">
          {payments.map((payment) => (
            <PaymentCard
              key={payment._id}
              payment={payment}
              onSelect={() => {
                setSelectedPayment(payment._id);
                setAdminNotes("");
              }}
              isSelected={selectedPayment === payment._id}
            />
          ))}
        </div>
      )}

      {selectedPayment && (
        <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review Payment Request</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedPayment(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {payments.map((p) =>
                p._id === selectedPayment ? (
                  <div key={p._id} className="payment-details">
                    <div className="detail-row">
                      <label>User Name:</label>
                      <span>{p.userId.name}</span>
                    </div>
                    <div className="detail-row">
                      <label>Email:</label>
                      <span>{p.userId.email}</span>
                    </div>
                    <div className="detail-row">
                      <label>Amount (BDT):</label>
                      <span className="amount">{p.amount}</span>
                    </div>
                    <div className="detail-row">
                      <label>Payment Method:</label>
                      <span className="method">{p.method.toUpperCase()}</span>
                    </div>
                    <div className="detail-row">
                      <label>Transaction ID:</label>
                      <span className="txn-id">{p.transactionId}</span>
                    </div>
                    <div className="detail-row">
                      <label>Date:</label>
                      <span>{new Date(p.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="form-group">
                      <label>Admin Notes (Optional):</label>
                      <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add any notes about this payment..."
                        rows="4"
                      />
                    </div>
                  </div>
                ) : null
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-approve"
                onClick={() => handleApprove(selectedPayment)}
              >
                ✓ Approve Payment
              </button>
              <button
                className="btn btn-reject"
                onClick={() => handleReject(selectedPayment)}
              >
                ✕ Reject Payment
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setSelectedPayment(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
