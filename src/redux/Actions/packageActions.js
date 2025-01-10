import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthUserId, getToken } from "../../utils/_apiConfig";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: baseUrl,
});

export const getUserPackageByUserId = createAsyncThunk(
  "package/getUserPackageByUserId",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getAuthUserId(getState);
      const response = await api.get(
        `Customer/GetUserPackageByUserId/${userId}`,
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

export const getPackageById = createAsyncThunk(
  "pakcage/gePackageById",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(`Customer/GetPackageById/${id}`, {
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

export const paymentWithPackage = createAsyncThunk(
  "package/paymentWithPackage",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `StripePayment/CreateStripeChargeForPackage/`,
        checkoutDto,
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
