import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Password from "../../../components/Shared/Profile/Password";

const ClientUpdatePassword = () => {
  const { userAuth } = useSelector((state) => state?.authentication);

  if (!userAuth) {
    return <Navigate to="/" />;
  }

  return <Password />;
};

export default ClientUpdatePassword;
