import { toast } from "react-toastify";
import { convertToISO } from "../_helpers";
import { postRenewToken } from "../../redux/Actions/authActions";
import { logout } from "../../redux/Reducers/authSlice";

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
        logAndToastError(statusCode, errorMessage, error.response);
        break;
    }
  } else if (error.request) {
    toast.error("No response received from the server");
  } else {
    toast.error(`Error setting up the request: ${error.message}`);
  }
};

export const rejectWithError = (error, dispatch, tokenExpiryTime) => {
  toast.error(error?.response?.data);
};

// Unauthorized Error Handler
const handleUnauthorizedError = (error, dispatch, tokenExpiryTime) => {
  const currentTimeInSeconds = Date.now() / 1000;
  const tokenExpiryInSeconds = new Date(tokenExpiryTime).getTime() / 1000;

  if (tokenExpiryInSeconds && tokenExpiryInSeconds < currentTimeInSeconds) {
    toast.error("Session has expired. Please log in again.");
    dispatch(logout());
  }

  // Check if the token is about to expire in 5 minutes or less
  // if (
  //   tokenExpiryInSeconds &&
  //   tokenExpiryInSeconds - currentTimeInSeconds <= 300
  // ) {
  //   dispatch(postRenewToken());
  // }
};

// Utility function to log and display errors
const logAndToastError = (statusCode, errorMessage, response) => {
  console.error(
    `Server returned error with status ${statusCode}: ${errorMessage}`,
    response
  );

  let userFriendlyMessage;

  switch (statusCode) {
    case 400:
      userFriendlyMessage =
        response?.data?.message || "Bad Request. Please check your input.";
      break;
    case 401:
      userFriendlyMessage =
        response?.data?.message || "Unauthorized. Please log in to continue.";
      break;
    case 403:
      userFriendlyMessage =
        response?.data?.message ||
        "Forbidden. You don't have permission to access this resource.";
      break;
    case 404:
      userFriendlyMessage =
        response?.data?.message ||
        "The requested resource was not found. Please try again.";
      break;
    case 408:
      userFriendlyMessage =
        response?.data?.message ||
        "The request timed out. Please check your connection and try again.";
      break;
    case 429:
      userFriendlyMessage =
        response?.data?.message ||
        "Too many requests. Please slow down and try again later.";
      break;
    case 500:
      userFriendlyMessage =
        response?.data?.message ||
        "Internal server error. Something went wrong on our side. Please try again later.";
      break;
    case 502:
      userFriendlyMessage =
        response?.data?.message ||
        "Bad Gateway. The server received an invalid response. Please try again later.";
      break;
    case 503:
      userFriendlyMessage =
        response?.data?.message ||
        "Service Unavailable. The server is temporarily overloaded or under maintenance.";
      break;
    case 504:
      userFriendlyMessage =
        response?.data?.message ||
        "Gateway Timeout. The server took too long to respond. Please try again later.";
      break;
    default:
      userFriendlyMessage =
        "An unexpected error occurred. Please try again later.";
      break;
  }

  // Display the error message to the user
  toast.error(userFriendlyMessage);
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
