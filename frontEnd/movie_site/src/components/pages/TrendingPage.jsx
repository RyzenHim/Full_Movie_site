import { useGetMoviesQuery } from "../../redux/moviesApi";
import MovieCard from "../movies/MovieCard";
import { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";

export default function TrendingPage() {
    const { data: movies = [], isLoading } = useGetMoviesQuery({});

    const trending = movies.filter(
        (m) => m.isTrending || m.imdbRating >= 8.5
    );

    const [sortType, setSortType] = useState("popularity");

    if (isLoading)
        return (
            <h2 className="text-white p-10 text-xl animate-pulse">
                Loading Trending Movies...
            </h2>
        );

    const sorted = [...trending].sort((a, b) => {
        switch (sortType) {
            case "rating":
                return b.imdbRating - a.imdbRating;
            case "year":
                return b.year - a.year;
            case "az":
                return a.title.localeCompare(b.title);
            case "za":
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    return (
        <div className="relative min-h-screen pt-24 px-6 md:px-12 text-white">

            {/* 🔥 BACKGROUND GLASS EFFECT + GRADIENTS */}
            <div className="absolute inset-0 -z-10">

                {/* Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-br 
                    from-[#0e0e11] via-[#14141a] to-[#0a0a0d] opacity-90">
                </div>

                {/* Neon Glows */}
                <div className="absolute top-10 left-10 w-60 h-60 
                    bg-blue-600/20 blur-[120px] rounded-full"></div>

                <div className="absolute bottom-20 right-20 w-72 h-72 
                    bg-purple-600/20 blur-[140px] rounded-full"></div>

                {/* Glass Noise Layer */}
                <div className="absolute inset-0 backdrop-blur-[4px] bg-white/5"></div>
            </div>

            {/* GLASS OUTER CONTAINER */}
            <div className="
                backdrop-blur-2xl bg-white/10 dark:bg-black/30 
                border border-white/10 rounded-3xl 
                shadow-[0_0_25px_rgba(0,0,0,0.6)]
                p-8 md:p-12
            ">

                {/* Header + Sorting */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow">
                        🔥 Trending Movies
                    </h1>

                    {/* Sort Controls */}
                    <div className="
                        flex items-center gap-3
                        bg-white/10 dark:bg-black/50
                        border border-white/20
                        rounded-xl px-4 py-2 shadow-lg
                    ">
                        <FaSortAmountDown className="text-blue-400" />

                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className="bg-transparent text-white outline-none text-lg cursor-pointer"
                        >
                            <option value="popularity">🔥 Popularity</option>
                            <option value="rating">⭐ Rating</option>
                            <option value="year">📅 Year</option>
                            <option value="az">A → Z</option>
                            <option value="za">Z → A</option>
                        </select>
                    </div>
                </div>

                {/* Movie Grid */}
                <div
                    className="
                    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                    lg:grid-cols-6 gap-6
                    "
                >
                    {sorted.length > 0 ? (
                        sorted.map((movie) => (
                            <div key={movie._id} className="transition-transform hover:scale-[1.03]">
                                <MovieCard movie={movie} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300 text-lg mt-10 col-span-full">
                            No trending movies found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
