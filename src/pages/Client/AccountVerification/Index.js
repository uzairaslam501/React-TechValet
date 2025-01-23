import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { emailVerification } from "../../../redux/Actions/authActions";

const AccountProcess = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verificationProcess = useCallback(() => {
    dispatch(emailVerification(params)).then((response) => {
      if (response?.payload) {
        navigate("/login");
      } else {
        navigate("/account-verification/fail");
      }
    });
  });

  useEffect(() => {
    if (params) {
      verificationProcess();
    } else {
      navigate("/account-verification/fail");
    }
  }, [params]);
};

export default AccountProcess;
