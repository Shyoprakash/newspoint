// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { getCookie } from '../../utils/utils';

// const initialState = {
//   loading: false,
//   bookmarks: [],
//   error: null,
// };

// export const addBookmarks = createAsyncThunk(
//   'bookmarks/addBookmarks',
//   async (data, { rejectWithValue }) => {
//     const id = getCookie('id');
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
//         data
//       );
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const removeBookmarks = createAsyncThunk(
//   'bookmarks/removeBookmarks',
//   async (articleUrl, { rejectWithValue }) => {
//     const id = getCookie('id');
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
//         { data: { articleUrl } } // ✅ Correct way to send body with DELETE
//       );
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getBookmarks = createAsyncThunk(
//   'bookmarks/getBookmarks',
//   async (_, { rejectWithValue }) => {
//     const id = getCookie('id');
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`
//       );
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const bookmarkSlice = createSlice({
//   name: 'bookmarks',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addBookmarks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addBookmarks.fulfilled, (state, action) => {
//         state.loading = false;
//         // Optional: Push to local bookmarks if needed
//       })
//       .addCase(addBookmarks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeBookmarks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(removeBookmarks.fulfilled, (state, action) => {
//         state.loading = false;
//         // Optional: Remove from local bookmarks if needed
//       })
//       .addCase(removeBookmarks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getBookmarks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBookmarks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookmarks = action.payload.data;
//       })
//       .addCase(getBookmarks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default bookmarkSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/utils";

const initialState = {
  loading: false,
  bookmarks: [],
  error: null,
};

/* ---------- Thunks ---------- */

export const addBookmarks = createAsyncThunk(
  "bookmarks/addBookmarks",
  async (data, { rejectWithValue }) => {
    const id = getCookie("id");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        data
      );
      return res.data; // { message, newBookmark }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeBookmarks = createAsyncThunk(
  "bookmarks/removeBookmarks",
  async (articleUrl, { rejectWithValue }) => {
    const id = getCookie("id");
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        { data: { articleUrl } }
      );
      return res.data; // { message }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "bookmarks/getBookmarks",
  async (_, { rejectWithValue }) => {
    const id = getCookie("id");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`
      );
      return res.data; // either [ ... ] OR { data: [ ... ] }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ---------- Slice ---------- */

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* --- add --- */
      .addCase(addBookmarks.pending, (s) => {
        s.loading = true;
      })
      .addCase(addBookmarks.fulfilled, (s, a) => {
        s.loading = false;
        s.bookmarks.push(a.payload.newBookmark); // 🔴 NEW – client‑side add
      })
      .addCase(addBookmarks.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      /* --- remove --- */
      .addCase(removeBookmarks.pending, (s) => {
        s.loading = true;
      })
      .addCase(removeBookmarks.fulfilled, (s, a) => {
        s.loading = false;
        // const removedUrl = a.meta.arg;
        // s.bookmarks = s.bookmarks.filter((b)=>b.articleUrl !== removedUrl);
        const removedUrl = a.meta.arg;
        s.bookmarks = s.bookmarks.filter((b) => b.url !== removedUrl);
      })
      .addCase(removeBookmarks.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      /* --- get --- */
      .addCase(getBookmarks.pending, (s) => {
        s.loading = true;
      })
      .addCase(getBookmarks.fulfilled, (s, a) => {
        s.loading = false;
        s.bookmarks = a.payload?.data || a.payload; // 🔴 NEW – shape‑safe
      })
      .addCase(getBookmarks.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default bookmarkSlice.reducer;
