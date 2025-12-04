const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        genres: [String],
        runtime: Number, // in minutes
        language: String,
        countries: [String],
        ageRating: String, // Rated
        imdbId: String,
        imdbRating: Number,
        imdbVotes: Number,
        rating: Number, // copy of imdbRating for your own usage
        voteCount: Number, // copy of imdbVotes

        overview: String,
        tagline: String,
        plot: String,
        keywords: [String],

        posterUrl: String,

        directors: [String],
        writers: [String],
        cast: [String],
        productionCompanies: [String],
        releasedDate: Date,

        // you can use these for sections (Trending, Popular, etc.)
        isTrending: { type: Boolean, default: false },
        isTopRated: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
