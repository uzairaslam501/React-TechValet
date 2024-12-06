import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";

const api = axios.create({
  baseURL: baseUrl,
});

// Async thunk for login
export const postLogin = createAsyncThunk(
  "user/postLogin",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.post("/auth/login", userData);
      const responseBack = processApiResponse(response, dispatch);
      localStorage.setItem("userInfo", JSON.stringify(responseBack?.data));
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

// Async thunk for registration
export const postRegister = createAsyncThunk(
  "user/postRegister",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const responseBack = response;
      return responseBack?.data; // Return registration response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
