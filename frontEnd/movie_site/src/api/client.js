import axios from "axios";

export const api = axios.create({
    baseURL: "https://full-movie-site.onrender.com", // your Mongo backend
});
