import axios from "axios";
export const api = axios.create({
    baseURL: "https://full-movie-site-backend.onrender.com", // correct API backend
});
