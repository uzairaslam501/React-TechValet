import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken, getUserRole } from "../../utils/_apiConfig";
import { getFirstAndLastDayOfMonth } from "../../utils/_helpers";
import { setLoading } from "../Reducers/loadingSlice";

const api = axios.create({
  baseURL: baseUrl,
});

export const getOrderEventsByUserId = createAsyncThunk(
  "calendar/getOrderEventsByUserId",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const role = getUserRole(getState);
    // Show loader for calendar loading
    dispatch(setLoading({ key: "calendarLoading", value: true }));
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
    } finally {
      // Hide loader after the API call is done
      dispatch(setLoading({ key: "calendarLoading", value: false }));
    }
  }
);

export const profileOrdersPreview = createAsyncThunk(
  "calendar/profileOrdersPreview",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const role = getUserRole(getState);
    const currentDate = getFirstAndLastDayOfMonth().monthStart;
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
