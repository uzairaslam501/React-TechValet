import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken, getUserRole } from "../../utils/_apiConfig";
import { toast } from "react-toastify";
import { getFirstAndLastDayOfMonth } from "../../utils/_helpers";

const api = axios.create({
  baseURL: baseUrl,
});

export const getOrderEventsByUserId = createAsyncThunk(
  "calendar/getOrderEventsByUserId",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const role = getUserRole(getState);

    try {
      const response = await api.get(
        `/User/order-events/${userId}?role=${role}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const { data } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const profileOrdersPreview = createAsyncThunk(
  "calendar/profileOrdersPreview",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const role = getUserRole(getState);
    const currentDate = getFirstAndLastDayOfMonth().currentDay;
    try {
      const response = await api.get(
        `/User/order-events/${encodeURIComponent(
          userId
        )}?role=valet&filterDate=${String(currentDate)}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const { data } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
