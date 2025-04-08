import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
  error: null,
  news: [],
  totalPages: 0,
  totalCount: 0,
  totalItem: 0,
  readingHistory: [],
  bookmarks: [],
};

export const setPreferences = createAsyncThunk(
  'preferences/setPreferences',
  async (data, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/preferences/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchAllNews = createAsyncThunk(
  '/fetchallnews',
  async ({ currentPage, search }, { rejectWithValue }) => {
    console.log(search);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/news?page=${currentPage}&keyword=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const addReadingHistory = createAsyncThunk(
  '/reading-history',
  async (data, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getReadingHistory = createAsyncThunk(
  '/getreading-history',
  async (_, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearReadingHistory = createAsyncThunk(
  '/clearReadingHistory',
  async (_, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear reading history');
    }
  }
);




const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        console.log(action.payload);
        state.totalPages = action.payload.totalPages;
        state.news = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalItem = action.payload.length;
        state.loading = false;
      })
      .addCase(addReadingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getReadingHistory.pending, (state) => {
        state.loading = false;
      })
      .addCase(getReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.readingHistory = action.payload.data;
      })
      .addCase(getReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      }).addCase(clearReadingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearReadingHistory.fulfilled, (state, action) => {
        state.readingHistory = []; // Clear from state
        state.loading = false;
      })
      .addCase(clearReadingHistory.rejected, (state, action) => {
        console.error("Error clearing reading history:", action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      
      
  },
});

export const { resetState } = newsSlice.actions;
export default newsSlice.reducer;