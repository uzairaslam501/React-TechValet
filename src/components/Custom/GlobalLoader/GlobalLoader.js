import React from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const GlobalLoader = () => {
  const loadingStates = useSelector((state) => state.loading); // Get all loading states
  const isLoading = Object.values(loadingStates).some((loading) => loading); // Check if any is true

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(157, 157, 157, 0.8)",
        backdropFilter: "blur(15px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default GlobalLoader;
