const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const addReview = async (req, res) => {
    try {
        const { rating, text } = req.body;
        const movie = await Movie.findById(req.params.id);

        movie.comments.push({
            userName: "Guest User",
            rating,
            text,
        });

        await movie.save();
        res.json({ message: "Review added" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add review" });
    }
};


module.exports = {
    getAllMovies,
    getMovieById,
    addReview,
};
