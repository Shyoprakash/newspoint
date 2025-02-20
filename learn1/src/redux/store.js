import { configureStore } from "@reduxjs/toolkit";
import countReducer from './slice/counterSlice.js'
import colorReducer from './slice/colorSlice.js'
import productReducer from './slice/productSlice.js'
import authReducer from './slice/authSlice.js'

const store = configureStore({
    reducer : {
       count : countReducer,
       color : colorReducer,
       product : productReducer,
       auth : authReducer
    }
})

export default store