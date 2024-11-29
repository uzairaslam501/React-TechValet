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
    try {
      const jwtToken = getToken(getState);
      const userId = getAuthUserId(getState);
      const response = await api.post(
        `StripePayment/create-checkout-session/${userId}`,
        checkoutDto,
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

export const createPaymentIntent = createAsyncThunk(
  "stripe/createPaymentIntent",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const userId = getAuthUserId(getState);
      const response = await api.post(
        `StripePayment/payment-intent/${userId}`,
        checkoutDto,
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

export const paymentSuccess = createAsyncThunk(
  "stripe/paymentSuccess",
  async (session_id, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(
        `StripePayment/payment-success/${session_id}`,
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

export const createStripeCharge = createAsyncThunk(
  "stripe/createStripeCharge",
  async (checkoutDto, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const userId = getAuthUserId(getState);
      const response = await api.post(
        `StripePayment/CreateStripeCharge/`,
        checkoutDto,
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
