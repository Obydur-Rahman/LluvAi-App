import React from "react";
import "../styles/PaymentCard.css";

const PaymentCard = ({ payment, onSelect, isSelected }) => {
  const getMethodColor = (method) => {
    switch (method) {
      case "bkash":
        return "#e2144c";
      case "rocket":
        return "#9c27b0";
      case "nagad":
        return "#ff6b6b";
      default:
        return "#333";
    }
  };

  return (
    <div
      className={`payment-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="card-header">
        <div
          className="method-badge"
          style={{ backgroundColor: getMethodColor(payment.method) }}
        >
          {payment.method.toUpperCase()}
        </div>
        <div className="status-badge">PENDING</div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="label">User:</span>
          <span className="value">{payment.userId.name}</span>
        </div>
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{payment.userId.email}</span>
        </div>
        <div className="info-row">
          <span className="label">Amount:</span>
          <span className="value amount">{payment.amount} BDT</span>
        </div>
        <div className="info-row">
          <span className="label">Transaction ID:</span>
          <span className="value txn-id">{payment.transactionId}</span>
        </div>
        <div className="info-row">
          <span className="label">Date:</span>
          <span className="value">
            {new Date(payment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="card-footer">
        <button className="review-btn">Review</button>
      </div>
    </div>
  );
};

export default PaymentCard;
