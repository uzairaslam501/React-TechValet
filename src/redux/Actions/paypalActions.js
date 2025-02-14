import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getToken } from "../../utils/_apiConfig";
import { paypalAccountStateUpdate } from "../Reducers/authSlice";

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
      if (message) {
        toast.success(message);
      }
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
      if (message) {
        toast.success(message);
      }
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
      if (message) {
        toast.success(message);
      }
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
      if (message) {
        toast.success(message);
      }
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
      if (message) {
        toast.success(message);
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const addPayPalAccount = createAsyncThunk(
  "paypal/addPayPalAccount",
  async ({ userId, paypal }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/AddAccount/${userId}`,
        paypal,
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
      if (data?.isPayPalAuthorized === true) {
        dispatch(paypalAccountStateUpdate(data?.isPayPalAuthorized));
      }
      return data;
    } catch (error) {
      handleApiError(error, dispatch, expired);
    }
  }
);

export const cancelAndRefundOrder = createAsyncThunk(
  "paypal/cancelAndRefundOrder",
  async ({ captureId, orderId }, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/paypal-refund/${captureId}?orderId=${orderId}`,
        null,
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

export const cancelOrderAndRevertSession = createAsyncThunk(
  "paypal/cancelOrderAndRevertSession",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/cancelOrderAndRevertSession/${orderId}`,
        null,
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

export const cancelUnclaimedPayment = createAsyncThunk(
  "paypal/cancelUnclaimedPayment",
  async (payOutItemId, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `PayPalGateWay/cancel-unclaimed-payment/${payOutItemId}`,
        null,
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
