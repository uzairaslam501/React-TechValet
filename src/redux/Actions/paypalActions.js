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

export const postCheckoutForOrder = createAsyncThunk(
  "paypal/PayPalCheckoutForOrder",
  async (orderDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/PayPalCheckoutForOrder`,
        orderDto,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const postCheckoutForPackage = createAsyncThunk(
  "paypal/PayPalCheckoutForPackage",
  async (orderDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/PayPalCheckoutForPackage`,
        orderDto,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const checkPaymentStatusForOrder = createAsyncThunk(
  "paypal/checkPaymentStatusForOrder",
  async (model, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `PayPalGateWay/CheckPaymentStatusForOrder?paymentId=${model.paymentId}&token=${model.token}&payerID=${model.payerId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const checkPaymentStatusForPackage = createAsyncThunk(
  "paypal/checkPaymentStatusForPackage",
  async (model, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `PayPalGateWay/CheckPaymentStatusForPackage?paymentId=${model.paymentId}&token=${model.token}&payerID=${model.payerId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const chargeByPackage = createAsyncThunk(
  "paypal/chargeByPackage",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/CreateOrderBySession/`,
        checkoutDto,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { data, message } = processApiResponse(response, dispatch, expired);
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);
