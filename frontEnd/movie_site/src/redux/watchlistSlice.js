import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper to get token
const getToken = () => localStorage.getItem("movie_token");

// FETCH
export const fetchWatchlist = createAsyncThunk(
    "watchlist/fetchWatchlist",
    async (userId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const res = await axios.get(`${API_URL}/watchlist/${userId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || {});
        }
    }
);

// ADD
export const addMovieToWatchlist = createAsyncThunk(
    "watchlist/addMovie",
    async ({ userId, movieId }, { rejectWithValue }) => {
        try {
            const token = getToken();
            const res = await axios.post(
                `${API_URL}/watchlist/${userId}`,
                { movieId },
                { headers: token ? { Authorization: `Bearer ${token}` } : {} }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || {});
        }
    }
);

// REMOVE
export const removeMovieFromWatchlist = createAsyncThunk(
    "watchlist/removeMovie",
    async ({ userId, movieId }, { rejectWithValue }) => {
        try {
            const token = getToken();
            const res = await axios.delete(
                `${API_URL}/watchlist/${userId}/${movieId}`,
                { headers: token ? { Authorization: `Bearer ${token}` } : {} }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || {});
        }
    }
);

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchWatchlist.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
            .addCase(fetchWatchlist.fulfilled, (s, a) => {
                s.loading = false;
                s.list = a.payload || [];
            })
            .addCase(fetchWatchlist.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload?.message || "Failed to load watchlist";
            })
            .addCase(addMovieToWatchlist.fulfilled, (s, a) => {
                s.list = a.payload || s.list;
            })
            .addCase(removeMovieFromWatchlist.fulfilled, (s, a) => {
                s.list = a.payload || s.list;
            });
    },
});

export default watchlistSlice.reducer;
