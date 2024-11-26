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

export const getNotificationsCount = createAsyncThunk(
  "notifications/getNotificationsCount",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(
        `Notification/GetNotificationsCount?UserId=${id}`,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(
        `Notification/GetNotifications?UserId=${id}&isRead=-1`,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const markNotifications = createAsyncThunk(
  "notifications/MarkNotifications",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.patch(`Notification/MarkNotifications/${id}`, {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const { data, message } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.delete(
        `Notification/DeleteNotification?NotificationId=${id}`,
        {
          headers: {
            Authorization: `${jwtToken}`, // Token included in the request headers
          },
        }
      );
      if (response?.data?.status) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);
