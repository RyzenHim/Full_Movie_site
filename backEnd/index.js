
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const moviesRoutes = require("./routes/moviesRoutes");

const app = express();


app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://movie-site-frontend-vn43.onrender.com"
        ],
        credentials: true,
    })
);

app.use(express.json());

const MONGO_URI =
    process.env.MONGO_URI;

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
