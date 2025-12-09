// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ---- RESTORE LOGIN FROM LOCAL STORAGE ---- //
const storedToken = localStorage.getItem("movie_token");
const storedUser = localStorage.getItem("movie_user");

let parsedUser = null;
try {
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch {
    parsedUser = null;
}

// -------------------------------------------------------------
// REGISTER USER
// -------------------------------------------------------------
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, {
                name,
                email,
                password,
            });

            return res.data; // { token, user }
        } catch (err) {
            return rejectWithValue(
                err.response?.data || { message: "Registration failed" }
            );
        }
    }
);

// -------------------------------------------------------------
// LOGIN USER
// -------------------------------------------------------------
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            return res.data; // { token, user }
        } catch (err) {
            return rejectWithValue(
                err.response?.data || { message: "Login failed" }
            );
        }
    }
);

// -------------------------------------------------------------
// SLICE
// -------------------------------------------------------------
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: parsedUser,
        token: storedToken || null,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;

            localStorage.removeItem("movie_token");
            localStorage.removeItem("movie_user");
        },
    },

    extraReducers: (builder) => {
        builder

            // REGISTER --------------------------------
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;

                localStorage.setItem("movie_token", action.payload.token);
                localStorage.setItem(
                    "movie_user",
                    JSON.stringify(action.payload.user)
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Registration failed";
            })

            // LOGIN -----------------------------------
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;

                localStorage.setItem("movie_token", action.payload.token);
                localStorage.setItem(
                    "movie_user",
                    JSON.stringify(action.payload.user)
                );
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Login failed";
            });
    },
});

// EXPORTS
export const { logout } = authSlice.actions;
export default authSlice.reducer;
