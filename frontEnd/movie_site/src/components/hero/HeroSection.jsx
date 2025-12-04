import { FaPlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroSection({ movie }) {

    return (
        <div
            className="
            relative  h-[70vh] border
            rounded-2xl overflow-hidden 
            shadow-2xl bg-black
        "
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

            <div
                className="
                absolute top-1/2 -translate-y-1/2 
                left-0 md:left-8
                px-6 md:px-12               
                max-w-[90%] md:max-w-[50%] 
                text-white space-y-5
            "
            >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                    {movie.title}
                </h1>

                <div className="flex flex-wrap gap-3 text-gray-300 text-sm font-medium">
                    <span>{movie.year}</span> •
                    <span>{movie.ageRating}</span> •
                    <span>{movie.runtime} min</span> •
                    <span className="text-yellow-400 font-bold">⭐ {movie.imdbRating}</span>
                </div>

                <p className="text-gray-200 text-base leading-relaxed line-clamp-4">
                    {movie.plot}
                </p>

                <div className="flex gap-4 pt-4">
                    <Link
                        to={`/movie/${movie._id}`}
                        className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200"
                    >
                        <FaPlay className="inline-block mr-2" /> Watch Now
                    </Link>

                    <button className="bg-black/60 px-6 py-3 rounded-xl border border-white/30 hover:bg-black/80">
                        <FaPlus className="inline-block mr-2" /> Add to List
                    </button>
                </div>
            </div>
        </div>
    );
}
