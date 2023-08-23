import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

// Async thunk action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const user = getState().users.userAuth;
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryAction = createAsyncThunk(
  "category/fetch",
  async (_, { rejectWithValue, getState }) => {
    const user = getState().users.userAuth;
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/category`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: {},
    categoryList: [],
    loading: false,
    isCreated: false,
    appErr: undefined,
    serverErr: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
        state.isCreated = true;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.categoryList.push(action.payload);
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.isCreated = false;
        state.appErr = action.payload.message;
        state.serverErr = action.error.message;
      })
      .addCase(fetchCategoryAction.pending, (state) => {
        state.loading = true;
        state.appErr = "";
        state.serverErr = "";
      })
      .addCase(fetchCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
        state.appErr = "";
        state.serverErr = "";
      })
      .addCase(fetchCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload.message;
        state.serverErr = action.error.message;
      });
  },
});

export default categorySlice.reducer;
