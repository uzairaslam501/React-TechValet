import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedClient = () => {
  const location = useLocation();
  const { userAuth } = useSelector((state) => state?.authentication);
  if (userAuth) {
    if (userAuth?.isActive === "Active" || location?.pathname === "/account") {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" state={{ from: location }} />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedClient;
