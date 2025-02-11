import React from "react";
import { useDispatch } from "react-redux";
import { googleCliendId } from "../../../utils/_envConfig";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { postLoginWithGoogle } from "../../../redux/Actions/authActions";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleSuccess = async (response) => {
    const idToken = response.credential;
    dispatch(postLoginWithGoogle(idToken)).then((response) => {
      console.log("Backend Response:", response);
    });
  };

  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={googleCliendId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
