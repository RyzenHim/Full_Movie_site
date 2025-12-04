// backend/scripts/seedMovies.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { fetchMovieByTitle } = require("../utils/fetchMoviesFromOmdb");
const Movie = require("../models/Movie");

dotenv.config();

const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/full_movie_site";

const TITLES = [
    "Inception",
    "The Dark Knight",
    "Interstellar",
    "Fight Club",
    "The Matrix",
    "Parasite",
    "The Shawshank Redemption",
    "Pulp Fiction",
    "The Godfather",
    "The Godfather: Part II",
    "The Lord of the Rings: The Fellowship of the Ring",
    "The Lord of the Rings: The Two Towers",
    "The Lord of the Rings: The Return of the King",
    "Forrest Gump",
    "The Social Network",
    "Gladiator",
    "Whiplash",
    "The Prestige",
    "The Dark Knight Rises",
    "Django Unchained",
    "Mad Max: Fury Road",
    "Spider-Man: Into the Spider-Verse",
    "The Avengers",
    "Avengers: Infinity War",
    "Avengers: Endgame",
    "Joker",
    "Titanic",
    "Goodfellas",
    "Se7en",
    "Saving Private Ryan",
];

async function run() {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const docs = [];

    for (const title of TITLES) {
        try {
            const base = await fetchMovieByTitle(title);
            docs.push({
                ...base,
                rating: base.imdbRating,
                voteCount: base.imdbVotes,
                isTrending: Math.random() > 0.5,
                isTopRated: base.imdbRating >= 8.5,
            });
            console.log("✅ Fetched:", title);
        } catch (err) {
            console.error("❌ Error fetching:", title, "-", err.message);
        }
    }

    await Movie.deleteMany({});
    await Movie.insertMany(docs);
    console.log(`🎉 Seeded ${docs.length} movies`);
    await mongoose.connection.close();
    process.exit(0);
}

run().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});


