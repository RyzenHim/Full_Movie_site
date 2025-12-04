import { createSlice } from "@reduxjs/toolkit";

const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];

const watchlistSlice = createSlice({
    name: "watchlist",

    initialState: {
        list: savedList,
    },

    reducers: {
        addToWatchlist: (state, action) => {
            const exists = state.list.find((m) => m._id === action.payload._id);
            if (!exists) {
                state.list.push(action.payload);
                localStorage.setItem("watchlist", JSON.stringify(state.list));
            }
        },

        removeFromWatchlist: (state, action) => {
            state.list = state.list.filter((m) => m._id !== action.payload);
            localStorage.setItem("watchlist", JSON.stringify(state.list));
        },
    },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
