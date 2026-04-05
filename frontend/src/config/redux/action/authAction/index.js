import { createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "@/config/index.jsx";

export const loginUser = createAsyncThunk("user/login", async (user, thunkAPI) => {
    try {
        const response = await clientServer.post(`/login`, {
            email: user.email,
            password: user.password
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            // Just return the data, Redux handles the "fulfill" part
            return response.data;
        } else {
            return thunkAPI.rejectWithValue("Token not provided");
        }

    } catch (error) {
        // IMPORTANT: No 'throw' here. Just return.
        // Also use optional chaining to avoid crashing if error.response is undefined
        const errorMessage = error.response?.data?.message || "Login failed";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post(`/register`, {
                email: user.email,
                password: user.password,
                username: user.username,
                name: user.name
            });

            if (response.data.message === "User created successfully" || response.data) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue("Registration failed");
            }

        } catch (error) {
            // Consistency: use the same error extraction logic as login
            const errorMessage = error.response?.data?.message || "User already exists or server error";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const getAboutUser = createAsyncThunk("user/getAboutUser", async (user, thunkAPI) => {
    try {

        console.log(user);

        const response = await clientServer.get(`/get_user_and_profile`, {
            params: {
                token: user.token
            }
        });
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch user data";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});


export const getAllUsers = createAsyncThunk("user/getAllUsers", async (_, thunkAPI) => {
    try {
        const response = await clientServer.get(`/get_all_users`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch user data";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});