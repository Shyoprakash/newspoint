import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from '../../utils/utils';

const initialState = {
  loading: false,
  bookmarks: [],
  error: null,
};

export const addBookmarks = createAsyncThunk(
  'bookmarks/addBookmarks',
  async (data, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeBookmarks = createAsyncThunk(
  'bookmarks/removeBookmarks',
  async (articleUrl, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        { data: { articleUrl } } // ✅ Correct way to send body with DELETE
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookmarks = createAsyncThunk(
  'bookmarks/getBookmarks',
  async (_, { rejectWithValue }) => {
    const id = getCookie('id');
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: Push to local bookmarks if needed
      })
      .addCase(addBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: Remove from local bookmarks if needed
      })
      .addCase(removeBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload.data;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookmarkSlice.reducer;
