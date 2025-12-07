// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const moviesRoutes = require("./routes/moviesRoutes");

const app = express();

app.use(
    cors({
        origin: "https://movie-site-frontend-vn43.onrender.com/",
        credentials: true,
    })
);

app.use(express.json());

const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/full_movie_site";

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Backend running" });
});

app.use("/api/movies", moviesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
