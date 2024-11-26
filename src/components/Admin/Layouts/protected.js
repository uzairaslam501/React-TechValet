import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const userAuth = useSelector((state) => state?.authentication?.userAuth);

  return <>{userAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedLayout;
