import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/utils";
import axios from "axios";

const initialState = {
loading : false
}

const id = getCookie('id') ;

export const setPreferences = createAsyncThunk('/preferences', async(data, {rejectWithValue})=>{
try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/preferences/${id}`,data)
    return res.data
} catch (error) {
    return rejectWithValue(error)
}
})

const newsSlice = createSlice({
name : "news",
initialState,
extraReducers : (builder) => {
builder.addCase(setPreferences.pending, (state)=>{
    state.loading = true
}).addCase(setPreferences.fulfilled,(state)=>{
    state.loading = false
})
}
})


export default newsSlice.reducer