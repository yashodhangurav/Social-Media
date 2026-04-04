import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer";

/*
-----------STEPS FOR STATE MANAGEMENT--------------
    1. submit action
    2. handle action in its reducer
    3. register here -> Reducer                     //only 1 time

*/


export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})