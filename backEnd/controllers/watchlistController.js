const Watchlist = require("../models/Watchlist");
const Movie = require("../models/Movie");

// GET /api/watchlist/:userId
const getWatchlist = async (req, res) => {
    try {
        const { userId } = req.params;

        let watchlist = await Watchlist.findOne({ userId }).populate("movies");

        if (!watchlist) {
            watchlist = await Watchlist.create({ userId, movies: [] });
        }

        res.json(watchlist.movies);
    } catch (err) {
        console.error("Get watchlist error:", err);
        res.status(500).json({ message: "Failed to load watchlist" });
    }
};

// POST /api/watchlist/:userId (Add movie)
const addToWatchlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const { movieId } = req.body;

        if (!movieId) return res.status(400).json({ message: "movieId required" });

        let watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
            watchlist = await Watchlist.create({ userId, movies: [] });
        }

        const movie = await Movie.findById(movieId);

        if (!movie) return res.status(404).json({ message: "Movie not found" });

        const exists = watchlist.movies.some((id) => id.toString() === movieId);

        if (!exists) {
            watchlist.movies.push(movieId);
            await watchlist.save();
        }

        const updated = await watchlist.populate("movies");
        res.json(updated.movies);
    } catch (err) {
        console.error("Add watchlist error:", err);
        res.status(500).json({ message: "Failed to add movie" });
    }
};

// DELETE /api/watchlist/:userId/:movieId
const removeFromWatchlist = async (req, res) => {
    try {
        const { userId, movieId } = req.params;

        let watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) return res.json([]);

        watchlist.movies = watchlist.movies.filter((id) => id.toString() !== movieId);
        await watchlist.save();

        const updated = await watchlist.populate("movies");
        res.json(updated.movies);
    } catch (err) {
        console.error("Remove error:", err);
        res.status(500).json({ message: "Failed to remove movie" });
    }
};

module.exports = {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
};
