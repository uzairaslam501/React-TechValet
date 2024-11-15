import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { toast } from "react-toastify";
import { getAuthConfig, getToken } from "../../utils/_apiConfig";

const api = axios.create({
  baseURL: baseUrl,
});

const initialState = {
  loading: false,
  error: null,
};

export const getKeywords = createAsyncThunk(
  "user/getKeywords",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get("/User/GetHighSearchedKeys", {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch);
      console.log(responseBack.data);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getValetsList = createAsyncThunk(
  "user/getValetsList",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get("/User/GetUserListAsync", {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch);
      console.log(responseBack.data);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const getValetsBySearch = createAsyncThunk(
  "user/getValetsBySearch",
  async (keyword, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.get(`/User/SearchValet?keyword=${keyword}`, {
        headers: {
          Authorization: `${jwtToken}`, // Token included in the request headers
        },
      });
      const responseBack = processApiResponse(response, dispatch);
      console.log(responseBack.data);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

//#region  RequestService
export const requestService = createAsyncThunk(
  "user/requestService",
  async (record, { rejectWithValue, getState, dispatch }) => {
    try {
      const jwtToken = getToken(getState);
      const response = await api.post(
        "/Customer/PostAddRequestService",
        record,
        {
          headers: {
            Authorization: `${jwtToken}`,
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
//#endregion

//#region Tables

export const getRecords = createAsyncThunk(
  "customer/getRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}/Datatable/GetRequestServicesDatatableByUserIdAsync?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
        null,
        config
      );
      const responseBack = response;
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

export const getOrderRecords = createAsyncThunk(
  "customer/getOrderRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}/Datatable/GetOrdersDatatableByUserId?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
        null,
        config
      );
      const responseBack = response?.data;
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

export const getUserPackagesRecords = createAsyncThunk(
  "customer/getUserPackagesRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}/Datatable/GetUserPackageDatatableAsync?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
        null,
        config
      );
      const responseBack = response?.data;
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

export const getUserPackagesConsumptionRecords = createAsyncThunk(
  "customer/getUserPackagesConsumptionRecords",
  async (
    {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
      packageId,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}/Datatable/GetOrdersDatatableByPackageId?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}&packageId=${packageId}`,
        null,
        config
      );
      const responseBack = response?.data;
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

//#endregion
