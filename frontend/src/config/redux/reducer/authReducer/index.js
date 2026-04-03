import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../action/authAction";



const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    profileFetched: false,
    connections: [],
    connectionRequest: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = "knocking the door....";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
                state.message = "logIn is successfull..";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // registering action-> reducer
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Registering you....";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
                state.message = "Register is successfull..";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    }
})


export default authSlice.reducer;


// This slice manages authentication state using Redux Toolkit.
// It stores user data and tracks login status (loading, success, error).
// extraReducers handle async login actions (API calls) using loginUser:
// - pending → request in progress
// - fulfilled → login successful, user data saved
// - rejected → login failed, error stored