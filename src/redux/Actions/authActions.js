import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getToken } from "../../utils/_apiConfig";

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

//#region Profile
export const postUserUpdate = createAsyncThunk(
  "user/postUserUpdate",
  async ({ id, userData }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(`/Auth/UpdateProfile/${id}`, userData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const postUserActivity = createAsyncThunk(
  "user/postUserActivity",
  async ({ id, activityStatus }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Auth/user-activity-status/${String(id)}?activityStatus=${String(
          activityStatus
        )}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const postUserAvailable = createAsyncThunk(
  "user/postUserAvailable",
  async ({ id, available }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `/Auth/user-availability/${String(id)}?availabilityOption=${String(
          available
        )}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
//#endregion
