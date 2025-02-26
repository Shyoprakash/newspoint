import { removeCookie, setCookie } from '../../utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from '../../utils/utils';
import { toast } from 'sonner';
const initialState = {
  loading: false,
  authenticated:  getCookie('isAuthenticated') || false,
  name: getCookie('name' )|| null,
  id: getCookie('id') || null,
  Preferences: []
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
        data, { withCredentials: true }
      );

      const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, { withCredentials: true })
     
      return {...res.data,...verifyres.data};
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message); // 🔴 Backend error message handle kiya
      }
      return rejectWithValue('Something went wrong. Please try again.'); // 🔴 Default error message
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  error: null,
  reducers : {
    signOut : function(state){
      state.authenticated = false ;
      state.id = null ;
      state.name = null ;
      state.error = null; 
      removeCookie('isAuthenticated')
      removeCookie('name')
      removeCookie('id')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
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
        


      }).addCase(login.pending, (state) => {
        state.loading = true
      }).addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;
        setCookie('isAuthenticated', action.payload.authenticated);
        setCookie('name', action.payload.name);
        setCookie('id', action.payload.id);
        state.preferences = action.payload.preferences
        console.log(action.payload)
        toast.success(action.payload.message)

      }).addCase(login.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Login failed. Please try again.');
      })
  },
});

export default authSlice.reducer;
export const {signOut} = authSlice.actions



