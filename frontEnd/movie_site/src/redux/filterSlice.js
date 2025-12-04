import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres: ["Action", "Drama", "Sci-Fi", "Comedy", "Thriller", "Adventure"],
    languages: ["English", "Hindi", "Japanese", "Korean"],
    selectedGenre: "",
    selectedLanguage: "",
    minRating: 0,
    sortBy: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setGenre: (state, action) => {
            state.selectedGenre = action.payload;
        },
        setLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
        },
        setMinRating: (state, action) => {
            state.minRating = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        clearFilters: (state) => {
            state.selectedGenre = "";
            state.selectedLanguage = "";
            state.minRating = 1;
            state.sortBy = "";
        },
    },
});

export const { setGenre, setLanguage, setMinRating, setSortBy, clearFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
