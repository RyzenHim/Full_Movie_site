import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import AddToWatchlistButton from "../watchlist/AddToWatchlistButton";

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    const goToDetails = () => navigate(`/movie/${movie._id}`);

    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            onClick={goToDetails}
            className="
                relative w-56 h-80 rounded-xl overflow-hidden cursor-pointer group
                shadow-xl bg-white/5 backdrop-blur-xl border border-white/20
            "
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Details */}
            <div className="absolute bottom-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>

                <p className="text-gray-300 text-xs line-clamp-2">
                    {movie.plot}
                </p>

                <div className="flex gap-2 mt-4 items-center">
                    <span className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md">
                        <FaPlay size={12} /> Watch
                    </span>

                    <div onClick={(e) => e.stopPropagation()} className="flex-1 flex justify-end">
                        <AddToWatchlistButton movie={movie} compact />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
