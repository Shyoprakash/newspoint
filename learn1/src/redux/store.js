import { configureStore } from "@reduxjs/toolkit"; 
import loadingReducer from './slice/LoadingSlice.js'
import authReducer from './slice/authSlice.js'
import newsReducer from './slice/newsSlice.js'
//import summaryReducer from './slice/SummarySlice.js'
const store = configureStore({
    reducer : {
     laoding : loadingReducer,
     auth : authReducer,
     news : newsReducer,
    //  summaries : summaryReducer

    }
})

export default store