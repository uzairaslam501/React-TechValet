import {
  addBlogs,
  updateBlogs,
  getBlogsList,
  addSkillBlog,
  updateSkillBlogs,
  getSkillsContentList,
  GetBlogBySkill,
  GetSkills,
  valetBySkill,
} from "../Actions/seoActions";
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
    // Handle addBlogs
    builder
      .addCase(addBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = [...(state.blogs || []), action.payload]; // Add new blog
      })
      .addCase(addBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateBlogs
    builder
      .addCase(updateBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ); // Update the blog in the list
      })
      .addCase(updateBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getBlogsList
    builder
      .addCase(getBlogsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogsList.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload; // Save blogs list
      })
      .addCase(getBlogsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle addSkillBlog
    builder
      .addCase(addSkillBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkillBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.skillBlogs = [...(state.skillBlogs || []), action.payload]; // Add new skill blog
      })
      .addCase(addSkillBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateSkillBlogs
    builder
      .addCase(updateSkillBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkillBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.skillBlogs = state.skillBlogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ); // Update the skill blog
      })
      .addCase(updateSkillBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getSkillsContentList
    builder
      .addCase(getSkillsContentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkillsContentList.fulfilled, (state, action) => {
        state.loading = false;
        state.skillsContent = action.payload; // Save skills content list
      })
      .addCase(getSkillsContentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle GetBlogBySkill
    builder
      .addCase(GetBlogBySkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBlogBySkill.fulfilled, (state, action) => {
        state.loading = false;
        state.blogsBySkill = action.payload; // Save blogs filtered by skill
      })
      .addCase(GetBlogBySkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle GetSkills
    builder
      .addCase(GetSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload; // Save skills list
      })
      .addCase(GetSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle valetBySkill
    builder
      .addCase(valetBySkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(valetBySkill.fulfilled, (state, action) => {
        state.loading = false;
        state.valetsBySkill = action.payload; // Save valets by skill
      })
      .addCase(valetBySkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = articleSlice.actions;

export default articleSlice.reducer;
