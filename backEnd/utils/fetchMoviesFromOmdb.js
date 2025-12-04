const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const OMDB_KEY = process.env.OMDB_API_KEY;

async function fetchMovieByTitle(title, year) {
    if (!OMDB_KEY) {
        throw new Error("OMDB_API_KEY missing in .env");
    }

    const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${encodeURIComponent(
        title
    )}${year ? `&y=${year}` : ""}&plot=full`;

    const { data } = await axios.get(url);

    if (data.Response === "False") {
        throw new Error(`OMDb error for \"${title}\": ${data.Error}`);
    }

    return {
        title: data.Title,
        year: Number(data.Year),
        genres: data.Genre ? data.Genre.split(",").map((g) => g.trim()) : [],
        runtime: data.Runtime ? Number(data.Runtime.replace(" min", "")) : null,
        language: data.Language,
        countries: data.Country ? data.Country.split(",").map((c) => c.trim()) : [],
        ageRating: data.Rated,
        imdbId: data.imdbID,
        imdbRating:
            data.imdbRating && data.imdbRating !== "N/A"
                ? Number(data.imdbRating)
                : null,
        imdbVotes:
            data.imdbVotes && data.imdbVotes !== "N/A"
                ? Number(data.imdbVotes.replace(/,/g, ""))
                : null,
        overview: data.Plot && data.Plot !== "N/A" ? data.Plot : "",
        plot: data.Plot && data.Plot !== "N/A" ? data.Plot : "",
        posterUrl: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
        directors: data.Director
            ? data.Director.split(",").map((d) => d.trim())
            : [],
        writers: data.Writer ? data.Writer.split(",").map((w) => w.trim()) : [],
        cast: data.Actors ? data.Actors.split(",").map((a) => a.trim()) : [],
        productionCompanies: data.Production
            ? data.Production.split(",").map((p) => p.trim())
            : [],
    };
}

module.exports = { fetchMovieByTitle };
