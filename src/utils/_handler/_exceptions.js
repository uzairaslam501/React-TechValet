import { toast } from "react-toastify";
import { logout } from "../../redux/Reducers/authSlice";
import { convertToISO } from "../_helpers";

// Main API Error Handler
export const handleApiError = (error, dispatch, tokenExpiryTime) => {
  if (error) {
    const statusCode = error.status || error.statusCode || 500;
    const errorMessage = error.message || "An unexpected error occurred";

    switch (statusCode) {
      case 401:
        handleUnauthorizedError(error, dispatch, tokenExpiryTime);
        break;
      default:
        logAndToastError(statusCode, errorMessage);
        break;
    }
  } else if (error.request) {
    toast.error("No response received from the server");
  } else {
    toast.error(`Error setting up the request: ${error.message}`);
  }
};

// Unauthorized Error Handler
const handleUnauthorizedError = (error, dispatch, tokenExpiryTime) => {
  const currentTimeInSeconds = Date.now() / 1000;
  const tokenExpiryInSeconds = new Date(tokenExpiryTime).getTime() / 1000;

  if (tokenExpiryInSeconds && tokenExpiryInSeconds < currentTimeInSeconds) {
    toast.error("Session has expired. Please log in again.");
    dispatch(logout());
  }
};

// Utility function to log and display errors
const logAndToastError = (statusCode, errorMessage) => {
  console.error(
    `Server returned error with status ${statusCode}: ${errorMessage}`
  );
  switch (statusCode) {
    case 404:
      toast.error("Not Found");
      break;
    default:
      toast.error(errorMessage);
      break;
  }
};

// Response Handler
export const processApiResponse = (response, dispatch, tokenExpiryTime) => {
  if (!response?.data?.status) {
    handleApiError(response?.data, dispatch, tokenExpiryTime);
  } else {
    if (tokenExpiryTime) {
      tokenExpiryTime = convertToISO(tokenExpiryTime);
      handleUnauthorizedError("", dispatch, tokenExpiryTime);
    }
    return {
      data: response?.data?.data,
      message: response?.data?.message,
    };
  }
};
