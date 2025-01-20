import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";

const api = axios.create({
  baseURL: baseUrl,
});

// Get Valet By Skills
export const valetBySkill = createAsyncThunk(
  "article/valetBySkill",
  async (skill, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.get(
        `GeneralPurpose/GetValetsBySkill/${skill}`
      );
      const { data } = processApiResponse(response, dispatch);
      return data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);
