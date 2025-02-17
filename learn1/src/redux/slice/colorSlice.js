import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#ffffff", // Default light color (White)
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { changeColor } = colorSlice.actions;
export default colorSlice.reducer;
