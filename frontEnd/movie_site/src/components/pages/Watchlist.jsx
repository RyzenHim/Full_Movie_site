// src/components/pages/Watchlist.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MovieCard from "../movies/MovieCard";
import { removeMovieFromWatchlist, fetchWatchlist } from "../../redux/watchlistSlice";
import { FaTrash, FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const { list: watchlist, loading } = useSelector((state) => state.watchlist);

    useEffect(() => {
        if (user) {
            const userId = user._id || user.id;
            dispatch(fetchWatchlist(userId));
        }
    }, [dispatch, user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#050509] text-white pt-24 px-6 sm:px-12 pb-20 flex flex-col items-center justify-center">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                    <h1 className="text-3xl font-bold mb-4">Watchlist</h1>
                    <p className="text-gray-300 mb-6">
                        Sign in to start building your personal watchlist.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white pt-24 px-4 sm:px-10 pb-20">

            {/* Background glow */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#050509] via-[#050712] to-[#0b0b0d]" />
            <div className="fixed inset-0 -z-[9] opacity-30 bg-[radial-gradient(circle_at_top,_#3b82f6_0,_transparent_55%)]" />

            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        My Watchlist
                    </h1>
                    <p className="text-gray-300 mt-2 text-sm sm:text-base">
                        You have{" "}
                        <span className="text-blue-400 font-semibold">
                            {watchlist?.length || 0}
                        </span>{" "}
                        {watchlist?.length === 1 ? "movie" : "movies"} saved.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/movies")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
                     bg-white/5 border border-white/15 hover:bg-white/10
                     backdrop-blur-xl text-sm sm:text-base font-semibold"
                >
                    <FaFilm />
                    Browse Movies
                </button>
            </div>

            {/* Empty state */}
            {(!watchlist || watchlist.length === 0) && !loading && (
                <div className="mt-20 flex flex-col items-center justify-center">
                    <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                        <p className="text-gray-300 text-lg">
                            Your watchlist is empty.
                        </p>
                        <p className="text-gray-500 mt-2 text-sm">
                            Add movies by clicking the <strong>“Add to Watchlist”</strong>{" "}
                            button on any movie.
                        </p>
                        <button
                            onClick={() => navigate("/movies")}
                            className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg inline-flex items-center gap-2"
                        >
                            <FaFilm /> Go to Movies
                        </button>
                    </div>
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div className="mt-16 text-center text-gray-300">
                    Loading your watchlist...
                </div>
            )}

            {/* Grid */}
            {watchlist && watchlist.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {watchlist.map((movie) => (
                        <div key={movie._id} className="relative group">
                            <button
                                onClick={() => {
                                    const userId = user._id || user.id;
                                    dispatch(
                                        removeMovieFromWatchlist({ userId, movieId: movie._id })
                                    );
                                }}
                                className="
                  absolute -top-3 -right-3 z-20
                  bg-red-600 hover:bg-red-700 
                  p-2 rounded-full text-white text-sm
                  shadow-md opacity-0 group-hover:opacity-100
                  transition-all duration-200
                "
                            >
                                <FaTrash size={14} />
                            </button>

                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
