import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaPlay } from "react-icons/fa";

export default function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie._id}`}>
            <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="
                    relative w-56 h-80 rounded-xl overflow-hidden cursor-pointer group
                    shadow-xl bg-black/30 backdrop-blur-sm
                "
            >
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="
                        w-full h-full object-cover rounded-xl
                        group-hover:brightness-75
                        transition-all duration-300
                    "
                />

                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-t from-black via-black/40 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300
                    "
                ></div>

                <div
                    className="
                        absolute bottom-0 w-full p-4
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300
                    "
                >
                    <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>

                    <p className="text-gray-300 text-xs leading-snug line-clamp-2">
                        {movie.plot}
                    </p>

                    <div className="flex gap-2 mt-4">
                        <span className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md">
                            <FaPlay size={12} /> Watch
                        </span>
                        <button className="bg-black/60 text-white px-3 py-1.5 rounded-lg border border-white/20 shadow hover:bg-black/80 transition-all">
                            <FaPlus size={12} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
