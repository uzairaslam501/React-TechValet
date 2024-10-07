// src/api.js
import axios from "axios";

// Set the base URL for the API
const API_URL = process.env.REACT_APP_API_URL;

// Create an instance of Axios with the base URL
const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Registration failed");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data; // This should include the token
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

// Get User Images
export const getUserImages = async (token) => {
  try {
    const response = await api.get("/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should be an array of user images
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch images");
  }
};

// Get Annotations for a Specific Image
export const getAnnotations = async (imageId, token) => {
  try {
    const response = await api.get(`/images/annotations/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should be an array of annotations for the image
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to fetch annotations"
    );
  }
};
