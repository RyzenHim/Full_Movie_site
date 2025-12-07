const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    getMovieById,
    addReview,
} = require("../controllers/movieController");

const Movie = require("../models/Movie");

router.get("/search", async (req, res) => {
    try {
        const q = req.query.q;

        if (!q || q.trim() === "") {
            return res.json([]);
        }

        const movies = await Movie.find({
            title: { $regex: q, $options: "i" },
        }).limit(10);

        res.json(movies);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Search failed" });
    }
});

router.get("/", getAllMovies);
router.get("/:id", getMovieById);

router.post("/:id/review", addReview);

module.exports = router;
