import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken } from "../../utils/_apiConfig";
import { toast } from "react-toastify";
import { setLoading } from "../Reducers/loadingSlice";
import { valetProfileComplitionStateUpdate } from "../Reducers/authSlice";

const api = axios.create({
  baseURL: baseUrl,
});

export const getRecordById = createAsyncThunk(
  "global/getRecordById",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      dispatch(setLoading({ key: "globalLoading", value: true }));
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    } finally {
      dispatch(setLoading({ key: "globalLoading", value: false }));
    }
  }
);

export const deleteRecords = createAsyncThunk(
  "global/deleteRecords",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.delete(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });
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

export const postUpdate = createAsyncThunk(
  "global/postUpdate",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const putUpdate = createAsyncThunk(
  "global/putUpdate",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(endpoint, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        toast.success(message);
      }
      console.log("global put resp ::", data);
      if (data?.isActive === 1) {
        dispatch(valetProfileComplitionStateUpdate("Active"));
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getTimezones = createAsyncThunk(
  "global/getTimezones",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.get("/admin/GetTimeZones");
      const { data } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const postAddContact = createAsyncThunk(
  "user/postAddContact",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(setLoading({ key: "globalLoading", value: true }));
      const response = await api.post(`/Contact/PostAddContact`, obj);
      const { message } = processApiResponse(response, dispatch);
      if (message) {
        toast.success(message);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      dispatch(setLoading({ key: "globalLoading", value: false }));
    }
  }
);
