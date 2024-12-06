import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken } from "../../utils/_apiConfig";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: baseUrl,
});

export const getRecordById = createAsyncThunk(
  "global/getRecordById",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const { data, message } = processApiResponse(response, dispatch, expired);
      if (message) {
        if (message) {
          toast.success(message);
        }
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
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
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
