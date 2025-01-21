import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthUserId, getToken } from "../../utils/_apiConfig";

const api = axios.create({
  baseURL: baseUrl,
});

//#region Articles

// Handle AddBlogs
export const addBlogs = createAsyncThunk(
  "seo/addBlogs",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const userId = getAuthUserId(getState);
    const formData = new FormData();
    formData.append("title", obj.Title);
    formData.append("description", obj.Description);
    formData.append("slug", obj.Slug);
    formData.append("content", obj.Content);
    formData.append("tags", obj.Tags);
    formData.append("createdBy", parseInt(userId));
    formData.append("Image", obj.FeaturedImageUrl);
    console.log(formData);
    try {
      const response = await api.post(`/Blogs/InsertBlog`, formData, {
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

export const updateBlogs = createAsyncThunk(
  "seo/updateBlogs",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const userId = getAuthUserId(getState);
    const formData = new FormData();
    formData.append("encId", encodeURIComponent(obj.encId));
    formData.append("title", obj.Title);
    formData.append("description", obj.Description);
    formData.append("slug", obj.Slug);
    formData.append("content", obj.Content);
    formData.append("tags", obj.Tags);
    formData.append("createdBy", parseInt(userId));
    formData.append("Image", obj.FeaturedImageUrl);

    try {
      const response = await api.put(`/Blogs/UpdateBlog`, formData, {
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

export const getBlogsList = createAsyncThunk(
  "seo/getBlogsList",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { token, expired } = getToken(getState);
    try {
      const response = await api.post(
        `${baseUrl}/Blogs/BlogDatatable?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
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
      rejectWithValue(error);
    }
  }
);

//#endregion

//#region Skills
// Handle Add-Skill-Blog
export const addSkillBlog = createAsyncThunk(
  "seo/addSkillBlog",
  async (obj, { rejectWithValue, getState, dispatch }) => {
    const { token, expired } = getToken(getState);
    const userId = getAuthUserId(getState);
    const formData = new FormData();
    formData.append("title", obj.title);
    formData.append("description", obj.description);
    formData.append("skill", obj.skill);
    formData.append("content", obj.content);
    formData.append("tags", obj.tags);
    formData.append("createdBy", parseInt(userId));
    formData.append("Image", obj.file);

    try {
      const response = await api.post(`/Blogs/InsertBlog`, formData, {
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

//#endregion
