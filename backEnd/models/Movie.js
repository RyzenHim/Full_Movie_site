const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        genres: [String],
        runtime: Number,
        language: String,
        countries: [String],
        ageRating: String,
        imdbId: String,
        imdbRating: Number,
        imdbVotes: Number,
        rating: Number,
        voteCount: Number,

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

        isTrending: { type: Boolean, default: false },
        isTopRated: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
