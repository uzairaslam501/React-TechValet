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

export const createCheckoutSession = createAsyncThunk(
  "stripe/createCheckoutSession",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getAuthUserId(getState);
      const response = await api.post(
        `StripePayment/create-checkout-session/${userId}`,
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

export const createPaymentIntent = createAsyncThunk(
  "stripe/createPaymentIntent",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const userId = getAuthUserId(getState);
      const response = await api.post(
        `StripePayment/payment-intent/${userId}`,
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

export const paymentSuccess = createAsyncThunk(
  "stripe/paymentSuccess",
  async (session_id, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.get(
        `StripePayment/payment-success/${session_id}`,
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

export const createStripeCharge = createAsyncThunk(
  "stripe/createStripeCharge",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `StripePayment/CreateStripeCharge/`,
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

export const stripeCheckOutForPackages = createAsyncThunk(
  "stripe/StripeCheckOutForPackages",
  async (orderDto, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `StripePayment/StripeCheckOutForPackages`,
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
