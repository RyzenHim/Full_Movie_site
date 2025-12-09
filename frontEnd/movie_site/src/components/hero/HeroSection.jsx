import { FaPlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function HeroSection({ movie, movies = [] }) {
    // Safe movies array
    const safeMovies = (movies && movies.length ? movies : [movie]).filter(
        (m) => m && m.posterUrl
    );

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const sliderRef = useRef(null);

    const hasMovies = safeMovies.length >= 1;

    const next = () => {
        if (!hasMovies) return;
        setIndex((prev) => (prev + 2) % safeMovies.length);
    };

    const prev = () => {
        if (!hasMovies) return;
        setIndex((prev) => (prev - 2 + safeMovies.length) % safeMovies.length);
    };

    // Auto slide
    useEffect(() => {
        if (!hasMovies || paused) return;

        const interval = setInterval(next, 7000);
        return () => clearInterval(interval);
    }, [paused, hasMovies]);

    // Touch swipe
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let startX = 0;

        const start = (e) => (startX = e.touches[0].clientX);
        const end = (e) => {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 50) prev();
            if (diff < -50) next();
        };

        slider.addEventListener("touchstart", start);
        slider.addEventListener("touchend", end);

        return () => {
            if (!slider) return;
            slider.removeEventListener("touchstart", start);
            slider.removeEventListener("touchend", end);
        };
    }, [safeMovies.length]);

    const tile1 = safeMovies[index % safeMovies.length];
    const tile2 = safeMovies[(index + 1) % safeMovies.length];

    return (
        <div
            ref={sliderRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative w-full mt-10 mb-14"
        >
            {/* ARROWS */}
            <button
                onClick={prev}
                className="
                    hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 
                    p-4 bg-black/40 hover:bg-black/70 
                    border border-white/20 rounded-full text-white shadow-xl
                "
            >
                <FaChevronLeft size={20} />
            </button>

            <button
                onClick={next}
                className="
                    hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 
                    p-4 bg-black/40 hover:bg-black/70 
                    border border-white/20 rounded-full text-white shadow-xl
                "
            >
                <FaChevronRight size={20} />
            </button>

            {/* TILES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HeroTile movie={tile1} />
                <HeroTile movie={tile2} />
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-3 mt-6">
                {safeMovies.map((_, i) => (
                    <div
                        key={i}
                        className={`
                            w-3 h-3 rounded-full transition-all
                            ${Math.floor(i / 2) === Math.floor(index / 2)
                                ? "bg-white scale-125"
                                : "bg-white/40 hover:bg-white/60"}
                        `}
                    />
                ))}
            </div>
        </div>
    );
}

function HeroTile({ movie }) {
    if (!movie) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={movie._id}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                whileHover={{
                    rotateY: 8,
                    rotateX: -4,
                    scale: 1.03,
                    transition: { duration: 0.4 },
                }}
                className="relative h-[55vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-2xl transform-gpu"
            >
                {/* BACKGROUND IMAGE */}
                <motion.img
                    key={movie.posterUrl}
                    src={movie.posterUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    animate={{ scale: 1.20 }}
                    transition={{ duration: 8, ease: "easeOut" }}
                />

                {/* OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                {/* FROSTED GLASS BOTTOM INFO BOX */}
                <div
                    className="
                        absolute bottom-6 left-6 right-6 z-20 
                        backdrop-blur-sm
                        border border-white/20 
                        rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                        p-6 
                        transition-all duration-500
                        hover:bg-white/15 hover:border-white/30
                    "
                >
                    {/* TITLE */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-sm">
                        {movie.title}
                    </h1>

                    {/* META DATA */}
                    <div className="text-gray-300 text-sm mt-2 mb-3 flex gap-3 flex-wrap">
                        <span>{movie.year}</span>
                        <span>• {movie.runtime} min</span>
                        <span className="text-yellow-400 font-bold">⭐ {movie.imdbRating}</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-gray-200 text-base line-clamp-2 mb-5">
                        {movie.plot}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-3">
                        <Link
                            to={`/movie/${movie._id}`}
                            className="
                                bg-white text-black px-5 py-3 rounded-xl 
                                font-semibold shadow-xl hover:scale-105 transition
                                flex items-center justify-center gap-2
                            "
                        >
                            View Details
                        </Link>

                        <button
                            className="
                                bg-white/20 backdrop-blur-xl px-5 py-3 rounded-xl 
                                border border-white/30 hover:bg-white/30 transition 
                                text-white flex items-center justify-center gap-2
                            "
                        >
                            <FaPlus /> Add
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
