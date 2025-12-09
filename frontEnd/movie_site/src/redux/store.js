import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import filterReducer from "./filterSlice";
import wishlistReducer from "./wishlistSlice";
import themeReducer from "./themeSlice";

import { moviesApi } from "./moviesApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterReducer,
        wishlist: wishlistReducer,
        theme: themeReducer,

        [moviesApi.reducerPath]: moviesApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
});
