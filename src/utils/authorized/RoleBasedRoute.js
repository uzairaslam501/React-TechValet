import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { userAuth } = useSelector((state) => state?.authentication);

  if (!userAuth) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userAuth.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
