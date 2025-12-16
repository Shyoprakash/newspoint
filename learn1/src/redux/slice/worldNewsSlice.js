import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorldNews = createAsyncThunk(
  "worldNews/fetch",
  async ({ page = 1, country = "us", lang = "en" }) => {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?` +
      `country=${country}&lang=${lang}&max=10&page=${page}` +
      `&token=${import.meta.env.VITE_GNEWS_API_KEY}`
    );

    const data = await res.json();
    return {
      articles: data.articles,
      total: data.totalArticles,
    };
  }
);

const worldNewsSlice = createSlice({
  name: "worldNews",
  initialState: {
    news: [],
    loading: false,
    page: 1,
    totalPages: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorldNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorldNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.total / 10);
      });
  },
});

export default worldNewsSlice.reducer;
