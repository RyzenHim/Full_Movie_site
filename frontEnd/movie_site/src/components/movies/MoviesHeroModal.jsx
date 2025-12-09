// src/components/movies/MovieHeroModal.jsx
import { FaTimes, FaStar, FaClock, FaHeart, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../../redux/wishlistSlice";

export default function MovieHeroModal({ movie, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlistItems = useSelector((state) => state.wishlist?.items || []);
    const isInWishlist = movie
        ? wishlistItems.some((m) => m._id === movie._id)
        : false;

    if (!movie) return null;

    const handleViewDetails = () => {
        onClose();
        navigate(`/movie/${movie._id}`);
    };

    const handleToggleWishlist = () => {
        dispatch(toggleWishlist(movie));
    };

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center
                       bg-black/60 backdrop-blur-md px-4"
        >
            {/* Click outside to close */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            {/* Modal card */}
            <div
                className="relative max-w-5xl w-full rounded-3xl overflow-hidden
                           bg-white/10 dark:bg-black/70
                           border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)]
                           flex flex-col md:flex-row z-[90]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Poster */}
                <div className="md:w-[38%] h-64 md:h-auto relative">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-7 space-y-4 relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 rounded-full bg-black/40 border border-white/30 w-9 h-9 flex items-center justify-center hover:bg-black/70"
                    >
                        <FaTimes className="text-white text-sm" />
                    </button>

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                            {movie.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-200">
                            <span>{movie.year}</span>
                            {movie.ageRating && <span>• {movie.ageRating}</span>}
                            <span className="flex items-center gap-1">
                                <FaClock className="text-blue-400" /> {movie.runtime} min
                            </span>
                            <span className="flex items-center gap-1 text-yellow-300 font-semibold">
                                <FaStar /> {movie.imdbRating}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-h-36 overflow-y-auto pr-2">
                        {movie.overview || movie.plot}
                    </p>

                    {/* Genres */}
                    {movie.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((g) => (
                                <span
                                    key={g}
                                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <button
                            onClick={handleViewDetails}
                            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm shadow-lg hover:bg-gray-200"
                        >
                            View Details
                        </button>

                        <button
                            onClick={handleToggleWishlist}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 border
                                ${isInWishlist
                                    ? "bg-pink-600/70 border-pink-300 text-white"
                                    : "bg-black/40 border-white/40 text-white hover:bg-black/70"
                                }`}
                        >
                            {isInWishlist ? (
                                <>
                                    <FaCheck /> Added to Wishlist
                                </>
                            ) : (
                                <>
                                    <FaHeart className="text-pink-400" /> Add to Wishlist
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
