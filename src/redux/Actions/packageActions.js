import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken, getUserId } from "../../utils/_apiConfig";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: baseUrl,
});

export const getUserPackageByUserId = createAsyncThunk(
  "packageRedux/getUserPackageByUserId",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getUserId(getState);
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
  "packageRedux/gePackageById",
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

export const getPackageByUserId = createAsyncThunk(
  "packageRedux/getPackageByUserId",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const userId = getUserId(getState);
    try {
      const response = await api.get(
        `Customer/GetPackageByUserId/${encodeURIComponent(userId)}`,
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

export const paymentWithPackage = createAsyncThunk(
  "packageRedux/paymentWithPackage",
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
