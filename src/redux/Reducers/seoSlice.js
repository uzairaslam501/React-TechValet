import { valetBySkill } from "../Actions/seoActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetState: (state) => {
      state.payload = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(valetBySkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(valetBySkill.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
      })
      .addCase(valetBySkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      });
  },
});

export const { resetState } = articleSlice.actions;

export default articleSlice.reducer;
