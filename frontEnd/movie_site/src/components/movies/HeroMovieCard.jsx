// src/components/movies/HeroMovieCard.jsx
import { useRef, useState } from "react";
import { FaStar, FaClock } from "react-icons/fa";

export default function HeroMovieCard({ movie, onOpen }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / rect.height) * 12;
        const rotateY = (x / rect.width) * 12;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    if (!movie) return null;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onOpen(movie)}
            className="
                relative h-72 sm:h-80 lg:h-96 min-w-[280px] cursor-pointer
                rounded-3xl overflow-hidden
                bg-white/5 dark:bg-black/40
                border border-white/15
                shadow-[0_25px_60px_rgba(0,0,0,0.8)]
                group select-none
            "
            style={{
                transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
                transition: "transform 0.18s ease-out",
            }}
        >
            {/* Poster */}
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition duration-300"
            />

            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Floating shine */}
            <div className="absolute -inset-10 opacity-0 group-hover:opacity-40 transition duration-500 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4)_0,_transparent_50%)]" />
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-3">
                <h2 className="text-xl sm:text-2xl font-extrabold drop-shadow-lg">
                    {movie.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300">
                    <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                        {movie.year}
                    </span>
                    {movie.ageRating && (
                        <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                            {movie.ageRating}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <FaClock className="text-blue-400" />
                        {movie.runtime} min
                    </span>
                    <span className="flex items-center gap-1 text-yellow-300 font-semibold">
                        <FaStar /> {movie.imdbRating}
                    </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 sm:line-clamp-3">
                    {movie.plot}
                </p>

                <div className="flex justify-between items-center pt-1 text-xs text-gray-300">
                    <span className="uppercase tracking-[0.2em] text-blue-300">
                        TAP FOR DETAILS
                    </span>
                    <span className="text-[0.65rem] sm:text-xs text-gray-400">
                        Glass Hero • Spotlight
                    </span>
                </div>
            </div>
        </div>
    );
}
