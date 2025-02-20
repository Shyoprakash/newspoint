// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'sonner';

// const initialState = {
//   loading: false,
// };

// export const SignUp = createAsyncThunk(
//   '/register',
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/register`,
//         data
//       );
//       return res.data; // ✅ Only serializable data return karo
//     } catch (error) {
//       return rejectWithValue({
//         message: error.message,                 // ✅ String
//         status: error.response?.status,        // ✅ Number
//         data: error.response?.data,            // ✅ Object
//       });
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(SignUp.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(SignUp.fulfilled, (state, action) => {
//         state.loading = false;
//         console.log("Success:", action.payload.message);
//         toast.success(action.payload.message);  // ✅ Success message toast
//       })
//       .addCase(SignUp.rejected, (state, action) => {
//         state.loading = false;

//         // ✅ Safe error handling with fallback
//         const errorMessage = action.payload?.data?.message || action.payload?.message || "Something went wrong";
//         console.log("Error:", errorMessage);
//         toast.error(errorMessage);  // ✅ Clean error toast
//       });
//   },
// });

// export default authSlice.reducer;










import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

const initialState = {
  loading: false,
};

export const SignUp = createAsyncThunk(
  '/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);

    }
  }
);
export const login = createAsyncThunk(
  '/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data , {withCredentials : true}
      );

      const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,{withCredentials : true})
      return res.data;
    } catch (error) {
      return rejectWithValue(error);

    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
        toast.success(action.payload.message);
      })
      .addCase(SignUp.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        toast.error(action.payload.response.data.message);

      }).addCase(login.pending,(state)=>{
        state.loading = true
      }).addCase(login.fulfilled,(state,action)=>{
        state.loading = false
      }).addCase(login.rejected,(state,action)=>{
        state.loading = false
      })
  },
});

export default authSlice.reducer;


