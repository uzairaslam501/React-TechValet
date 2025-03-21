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

const api = axios.create({
  baseURL: baseUrl,
});

export const addServicesOrExperience = createAsyncThunk(
  "servicesOrExperience/addServicesOrExperience",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `User/add-service-experience/${values.userId}?Description=${values.description}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      toast.success(message);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const updateServicesOrExperience = createAsyncThunk(
  "servicesOrExperience/updateServicesOrExperience",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `User/update-service-experience/${values.serviceId}?Description=${values.description}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      toast.success(message);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getServicesRecord = createAsyncThunk(
  "servicesOrExperience/getServicesRecord ",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(`User/user-services/${userId}`, {
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

//#region Slots
export const updateSlotTimes = createAsyncThunk(
  "servicesOrExperience/updateSlotTime",
  async ({ userId, slots }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.put(
        `User/user-available-slots/${encodeURIComponent(userId)}`,
        slots,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      toast.success(message);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getAvailability = createAsyncThunk(
  "servicesOrExperience/getAvailability",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `User/user-availability/${encodeURIComponent(userId)}`,
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
    }
  }
);
//#endregion

//#region Earnings
export const getUserEarnings = createAsyncThunk(
  "servicesOrExperience/getUserEarnings",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      dispatch(setLoading({ key: "serviceLoading", value: true }));
      const response = await api.get(
        `User/get-earnings/${encodeURIComponent(userId)}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data } = processApiResponse(response, dispatch, expired);
      dispatch(setLoading({ key: "serviceLoading", value: false }));
      return data;
    } catch (error) {
      dispatch(setLoading({ key: "serviceLoading", value: false }));
      handleApiError(error, dispatch, expired);
    }
  }
);

export const getUserEarningRecords = createAsyncThunk(
  "servicesOrExperience/getEarningRecords",
  async (
    {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
      packageId,
      userId,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `${baseUrl}/Datatable/CompletedOrder/${userId}?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}&packageId=${packageId}`,
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
    }
  }
);
//#endregion
