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

export const addServicesOrExperience = createAsyncThunk(
  "servicesOrExperience/getServicesRecord",
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
  "servicesOrExperience/getServicesRecord",
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
