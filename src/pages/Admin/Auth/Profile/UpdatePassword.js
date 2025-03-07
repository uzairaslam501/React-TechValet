import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Password from "../../../../components/Shared/Profile/Password";
const AdminUpdatePassword = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  if (!userAuth) {
    return <Navigate to="/" />;
  }
  return <Password />;
};
export default AdminUpdatePassword;
