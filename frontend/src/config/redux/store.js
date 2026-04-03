import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";

/*
-----------STEPS FOR STATE MANAGEMENT--------------
    1. submit action
    2. handle action in its reducer
    3. register here -> Reducer
    4. 

*/


export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})