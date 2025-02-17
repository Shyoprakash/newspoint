import { configureStore } from "@reduxjs/toolkit";
import countReducer from './slice/counterSlice.js'
import colorReducer from './slice/colorSlice.js'

const store = configureStore({
    reducer : {
       count : countReducer,
       color : colorReducer
    }
})

export default store