import React from "react";

const BadgeStatus = ({ status }) => {
  // Define mapping for different status values
  const statusMap = {
    0: { label: "In Progress", color: "#17a2b8" }, // Teal (Active)
    1: { label: "Open", color: "#28a745" }, // Green (Good)
    2: { label: "Booked", color: "#a67c00" }, // Brown-Yellow (Neutral)
    3: { label: "On Hold", color: "#ffc107" }, // Yellow (Pending)
    4: { label: "Cancelled", color: "#dc3545" }, // Red (Bad)
    5: { label: "Completed", color: "#198754" }, // Dark Green (Best)
    6: { label: "Refunded", color: "#007bff" }, // Blue (Informational)
    7: { label: "Failed", color: "#ff073a" }, // Bright Red (Critical)

    //For Packages
    8: { label: "Activate", color: "#6c757d" }, // Gray (Uncertain)
    9: { label: "Expired", color: "#d63384" }, // Pinkish-Red (Expired/Bad)
    10: { label: "1 Year", color: "#ff7f50" }, // Coral Orange (1 Year)
    11: { label: "2 Year", color: "#8a2be2" }, // Blue-Violet (2 Years)

    12: { label: "Under Review", color: "#6610f2" }, // Purple (Waiting for Approval)

    "In Progress": { label: "In Progress", color: "#17a2b8" }, // Teal (Active)
    Open: { label: "Open", color: "#28a745" }, // Green (Good)
    Booked: { label: "Booked", color: "#a67c00" }, // Brown-Yellow (Neutral)
    "On Hold": { label: "On Hold", color: "#ffc107" }, // Yellow (Pending)
    Cancelled: { label: "Cancelled", color: "#dc3545" }, // Red (Bad)
    Completed: { label: "Completed", color: "#198754" }, // Dark Green (Best)
    Refunded: { label: "Refunded", color: "#007bff" }, // Blue (Informational)
    Failed: { label: "Failed", color: "#ff073a" }, // Bright Red (Critical)

    //For Packages
    Activate: { label: "Activate", color: "#6c757d" }, // Gray (Uncertain)
    Expired: { label: "Expired", color: "#d63384" }, // Pinkish-Red (Expired/Bad)
    OneYear: { label: "1 Year", color: "#ff7f50" }, // Coral Orange (1 Year)
    TwoYear: { label: "2 Year", color: "#8a2be2" }, // Blue-Violet (2 Years)

    "Under Review": { label: "Under Review", color: "#6610f2" }, // Purple (Waiting for Approval)
  };

  // Default styling in case status is unknown
  const statusInfo = statusMap[status] || {
    label: status,
    color: "#343a40",
  }; // Dark gray fallback

  const badgeStyle = {
    backgroundColor: `${statusInfo.color}1A`, // Transparent background (10%)
    color: statusInfo.color, // Text color matches border
    border: `2px solid ${statusInfo.color}`, // Solid border
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "normal",
    textAlign: "center",
    minWidth: "80px",
  };

  return <span style={badgeStyle}>{statusInfo.label}</span>;
};

export default BadgeStatus;
