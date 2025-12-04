import { useGetMoviesQuery } from "../../redux/moviesApi";
import FilterPanel from "../filters/FilterPanel";
import MovieCard from "../movies/MovieCard";

import { useState } from "react";
import { FaFilter, FaTable, FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MoviesPage() {
    const { data: movies = [], isLoading } = useGetMoviesQuery({});
    const [query, setQuery] = useState("");
    const [view, setView] = useState("grid"); // ⭐ NEW → grid | table

    // Redux filter state
    const filterState = useSelector((state) => state.filter);
    const navigate = useNavigate();

    // Toggle filter panel sidebar
    const [openFilter, setOpenFilter] = useState(false);

    // FILTER LOGIC
    const filtered = movies.filter((m) => {
        const matchTitle = m.title.toLowerCase().includes(query.toLowerCase());
        const matchGenre =
            !filterState.selectedGenre ||
            m.genres.includes(filterState.selectedGenre);
        const matchLanguage =
            !filterState.selectedLanguage ||
            m.language === filterState.selectedLanguage;

        const matchRating =
            !filterState.minRating ||
            (m.imdbRating && m.imdbRating >= filterState.minRating);

        return matchTitle && matchGenre && matchLanguage && matchRating;
    });

    function applyFilters() {
        setOpenFilter(false);
        navigate("/movies#results");
    }

    if (isLoading)
        return (
            <h2 className="text-white p-10 text-xl animate-pulse">Loading movies...</h2>
        );

    return (
        <div className="relative pt-24 px-6 text-white">

            {/* FLOATING FILTER BUTTON (MOBILE) */}
            <button
                className="
                fixed bottom-8 right-6 z-40 
                bg-blue-600 hover:bg-blue-700 
                px-5 py-4 rounded-full 
                shadow-2xl flex items-center gap-2 
                text-lg font-bold
            "
                onClick={() => setOpenFilter(true)}
            >
                <FaFilter size={18} /> Filters
            </button>

            {/* SLIDING FILTER SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-black/70 backdrop-blur-xl 
                border-l border-white/20 shadow-xl p-6 z-50
                transform transition-transform duration-300
                ${openFilter ? "translate-x-0" : "translate-x-full"}
            `}
            >
                <h2 className="text-2xl font-bold mb-6">Filters</h2>

                <FilterPanel />

                <button
                    onClick={applyFilters}
                    className="
                    w-full mt-6 px-6 py-3 
                    bg-blue-600 hover:bg-blue-700 
                    rounded-xl text-lg font-bold
                "
                >
                    Apply Filters ➜
                </button>

                <button
                    onClick={() => setOpenFilter(false)}
                    className="absolute top-4 right-4 text-white text-xl hover:text-red-400"
                >
                    ✕
                </button>
            </div>

            {openFilter && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setOpenFilter(false)}
                ></div>
            )}

            {/* PAGE TITLE */}
            <h1 className="text-4xl font-bold mb-4">🎬 All Movies</h1>

            {/* SEARCH & VIEW TOGGLE BAR */}
            <div className="flex justify-between items-center mb-6 bg-black/40 p-4 rounded-xl border border-white/10">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search movie..."
                    className="
                    px-4 py-3 
                    w-full max-w-md 
                    bg-black/40 border border-white/20 rounded-xl 
                    outline-none text-white
                "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Grid / Table Toggle */}
                <div className="flex items-center gap-4 ml-6">

                    <button
                        onClick={() => setView("grid")}
                        className={`p-3 rounded-xl border 
                        ${view === "grid"
                                ? "bg-blue-600 border-blue-300"
                                : "bg-black/50 border-white/20"}
                        hover:bg-blue-500 transition-all`}
                    >
                        <FaThLarge />
                    </button>

                    <button
                        onClick={() => setView("table")}
                        className={`p-3 rounded-xl border 
                        ${view === "table"
                                ? "bg-blue-600 border-blue-300"
                                : "bg-black/50 border-white/20"}
                        hover:bg-blue-500 transition-all`}
                    >
                        <FaTable />
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
                        <p className="text-gray-400 col-span-full text-lg mt-10">
                            No matching movies found.
                        </p>
                    )}
                </div>
            )}

            {/* TABLE VIEW */}
            {view === "table" && (
                <div className="overflow-x-auto mt-6">
                    <table className="w-full bg-black/30 border border-white/10 rounded-xl">
                        <thead className="bg-white/10 text-left">
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
                                            className="w-16 rounded-lg"
                                            alt={movie.title}
                                        />
                                    </td>
                                    <td className="p-4 font-semibold">{movie.title}</td>
                                    <td className="p-4">{movie.year}</td>
                                    <td className="p-4 text-sm text-gray-300">
                                        {movie.genres.join(", ")}
                                    </td>
                                    <td className="p-4 text-yellow-400 font-bold">
                                        ⭐ {movie.imdbRating}
                                    </td>
                                    <td className="p-4">
                                        <button className="px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
