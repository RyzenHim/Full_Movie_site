import { FaTimes, FaStar, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddToWatchlistButton from "../watchlist/AddToWatchlistButton";

export default function MovieHeroModal({ movie, onClose }) {
    const navigate = useNavigate();

    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className="relative max-w-5xl w-full rounded-3xl overflow-hidden
                           bg-white/10 backdrop-blur-2xl border border-white/20
                           shadow-[0_30px_80px_rgba(0,0,0,0.9)]
                           flex flex-col md:flex-row z-[90]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Poster */}
                <div className="md:w-[38%] h-64 md:h-auto relative">
                    <img src={movie.posterUrl} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 rounded-full bg-black/40 border border-white/30 w-9 h-9 flex items-center justify-center hover:bg-black/70"
                    >
                        <FaTimes className="text-white text-sm" />
                    </button>

                    <h2 className="text-3xl font-extrabold">{movie.title}</h2>

                    <div className="flex flex-wrap items-center gap-3 text-gray-200 text-sm">
                        <span>{movie.year}</span>
                        {movie.ageRating && <span>{movie.ageRating}</span>}
                        <span className="flex items-center gap-1"><FaClock /> {movie.runtime} min</span>
                        <span className="flex items-center gap-1 text-yellow-300"><FaStar /> {movie.imdbRating}</span>
                    </div>

                    <p className="text-gray-200 max-h-40 overflow-y-auto pr-2">{movie.plot}</p>

                    <div className="flex flex-wrap gap-2">
                        {movie.genres?.map((g) => (
                            <span key={g} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs">
                                {g}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => {
                                onClose();
                                navigate(`/movie/${movie._id}`);
                            }}
                            className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm"
                        >
                            View Details
                        </button>

                        {/* Proper Watchlist button */}
                        <AddToWatchlistButton movie={movie} />
                    </div>
                </div>
            </div>
        </div>
    );
}
