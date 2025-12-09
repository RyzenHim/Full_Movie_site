// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const movie = action.payload;
            const exists = state.items.find((m) => m._id === movie._id);

            if (exists) {
                state.items = state.items.filter((m) => m._id !== movie._id);
            } else {
                state.items.push(movie);
            }
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
