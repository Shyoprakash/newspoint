import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    count: 0,
    notifications: []
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
      state.count = action.payload.length;
    },
    clearNotifications(state) {
      state.count = 0;
    }
  }
});

export const { setNotifications, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
