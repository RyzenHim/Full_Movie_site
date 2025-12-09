const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, index: true, unique: true },
        movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
