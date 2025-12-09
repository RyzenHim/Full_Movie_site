import { useGetMoviesQuery } from "../../redux/moviesApi";
import FilterPanel from "../filters/FilterPanel";
import MovieCard from "../movies/MovieCard";
import HeroMovieCard from "../movies/HeroMovieCard";
import MovieHeroModal from "../movies/MoviesHeroModal";

import { useState } from "react";
import { FaFilter, FaTable, FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MoviesPage() {
    const { data: movies = [], isLoading } = useGetMoviesQuery({});
    const [query, setQuery] = useState("");
    const [view, setView] = useState("grid");
    const [activeMovie, setActiveMovie] = useState(null);

    const filterState = useSelector((state) => state.filter);
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);

    // FILTER LOGIC
    const filtered = movies.filter((m) => {
        const matchTitle = m.title.toLowerCase().includes(query.toLowerCase());
        const matchGenre =
            !filterState.selectedGenre || m.genres.includes(filterState.selectedGenre);

        const matchLanguage =
            !filterState.selectedLanguage || m.language === filterState.selectedLanguage;

        const matchRating =
            !filterState.minRating ||
            (m.imdbRating && m.imdbRating >= filterState.minRating);

        return matchTitle && matchGenre && matchLanguage && matchRating;
    });

    // HERO MOVIES (Top rated)
    const heroMovies = [...filtered]
        .sort((a, b) => (b.imdbRating || 0) - (a.imdbRating || 0))
        .slice(0, 4);

    function applyFilters() {
        setOpenFilter(false);
        navigate("/movies#results");
    }

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15">
                    <h2 className="text-white text-xl animate-pulse">
                        Loading movies...
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-10 text-white">

            {/* Gradient background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#050509] via-[#050712] to-[#0b0b0d]" />
            <div className="fixed inset-0 -z-[9] opacity-30 bg-[radial-gradient(circle_at_top,_#3b82f6_0,_transparent_55%)]" />

            {/* HEADER BAR */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        🎬 All Movies
                    </h1>
                    <p className="text-gray-300 mt-2 text-sm sm:text-base">
                        Browse through{" "}
                        <span className="text-blue-400 font-semibold">{filtered.length}</span>{" "}
                        {filtered.length === 1 ? "title" : "titles"} based on your filters.
                    </p>
                </div>
            </div>

            {/* ⭐ HERO STRIP */}
            {heroMovies.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">
                        Spotlight Picks
                    </h2>

                    <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
                        {heroMovies.map((movie) => (
                            <HeroMovieCard
                                key={movie._id}
                                movie={movie}
                                onOpen={setActiveMovie}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* SEARCH + VIEW PANEL */}
            <div
                className="
                flex flex-col md:flex-row md:items-center md:justify-between gap-4
                mb-8 px-4 py-4
                bg-white/5 backdrop-blur-2xl 
                border border-white/15 
                rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.55)]
            "
            >
                <div className="flex-1">
                    <label className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search movie by title..."
                        className="
                        px-4 py-3 w-full 
                        bg-black/40 border border-white/20 rounded-xl 
                        outline-none text-white
                        focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400
                    "
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 bg-black/40 border border-white/15 rounded-2xl px-2 py-1">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-xl transition-all ${view === "grid"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <FaThLarge size={16} />
                    </button>

                    <button
                        onClick={() => setView("table")}
                        className={`p-2 rounded-xl transition-all ${view === "table"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <FaTable size={16} />
                    </button>
                </div>
            </div>

            {/* GRID VIEW */}
            {view === "grid" && (
                <div
                    id="results"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                >
                    {filtered.length > 0 ? (
                        filtered.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))
                    ) : (
                        <p className="text-gray-400 col-span-full text-lg mt-10 text-center">
                            No matching movies found.
                        </p>
                    )}
                </div>
            )}

            {/* TABLE VIEW */}
            {view === "table" && (
                <div
                    id="results"
                    className="overflow-x-auto mt-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.65)]"
                >
                    <table className="w-full text-sm">
                        <thead className="bg-white/10">
                            <tr>
                                <th className="p-4">Poster</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Year</th>
                                <th className="p-4">Genres</th>
                                <th className="p-4">Rating</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((movie) => (
                                <tr
                                    key={movie._id}
                                    className="border-t border-white/10 hover:bg-white/5"
                                >
                                    <td className="p-4">
                                        <img
                                            src={movie.posterUrl}
                                            className="w-16 h-20 object-cover rounded-lg"
                                            alt={movie.title}
                                        />
                                    </td>
                                    <td className="p-4 font-semibold">{movie.title}</td>
                                    <td className="p-4">{movie.year}</td>
                                    <td className="p-4 text-gray-300">{movie.genres.join(", ")}</td>
                                    <td className="p-4 text-yellow-400 font-bold">
                                        ⭐ {movie.imdbRating}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => navigate(`/movie/${movie._id}`)}
                                            className="px-3 py-1.5 bg-blue-600 rounded-lg hover:bg-blue-700"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ⭐ MODAL */}
            <MovieHeroModal
                movie={activeMovie}
                onClose={() => setActiveMovie(null)}
            />
        </div>
    );
}
