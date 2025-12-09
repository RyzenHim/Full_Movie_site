import {
    FaFireAlt,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

import MovieCard from "../movies/MovieCard";
import { useGetMoviesQuery } from "../../redux/moviesApi";
import { useRef, useState } from "react";

export default function TrendingSection() {
    const { data: movies = [], isLoading } = useGetMoviesQuery({});

    const trending = movies
        .filter((m) => m.isTrending || m.imdbRating >= 8.5)
        .slice(0, 20);

    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const updateProgress = () => {
        const el = scrollRef.current;
        if (!el) return;

        const maxScroll = el.scrollWidth - el.clientWidth;
        const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;

        setScrollProgress(progress);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollLeft -= 350;
        updateProgress();
    };

    const scrollRight = () => {
        scrollRef.current.scrollLeft += 350;
        updateProgress();
    };

    if (isLoading) {
        return (
            <div className="px-2 mb-12">
                <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-6"></div>
                <div className="flex gap-6 overflow-x-auto cyberpunk-scrollbar">
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="w-56 h-80 rounded-xl bg-white/10 animate-pulse"
                            />
                        ))}
                </div>
            </div>
        );
    }

    return (
        <section className="mb-14 px-4 relative">

            {/* Title */}
            <div className="flex items-center gap-3 mb-5">
                <FaFireAlt className="text-red-500 text-3xl" />
                <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-xl">
                    Trending Now
                </h2>
            </div>

            {/* LEFT ARROW */}
            <button
                onClick={scrollLeft}
                className="
                    hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20
                    bg-black/70 text-white p-3 rounded-full border border-white/20
                    hover:bg-black/90 transition shadow-xl
                "
            >
                <FaChevronLeft />
            </button>

            {/* SCROLLER */}
            <div
                ref={scrollRef}
                onScroll={updateProgress}
                className="
                    flex gap-6 
                    overflow-x-auto cyberpunk-scrollbar
                    scroll-smooth py-3 pr-2
                "
            >
                {trending.map((movie) => (
                    <div key={movie._id} className="relative">
                        {/* Trending Badge */}
                        <span
                            className="
                                absolute top-2 left-2 
                                bg-red-600 text-white text-xs font-bold 
                                px-2 py-1 rounded-lg shadow-lg
                                z-10
                            "
                        >
                            🔥 Trending
                        </span>

                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {/* RIGHT ARROW */}
            <button
                onClick={scrollRight}
                className="
                    hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20
                    bg-black/70 text-white p-3 rounded-full border border-white/20
                    hover:bg-black/90 transition shadow-xl
                "
            >
                <FaChevronRight />
            </button>

            {/* 🔥 NEON CYBERPUNK PROGRESS BAR */}
            <div className="w-full h-1.5 mt-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-xl border border-white/10">
                <div
                    className="
                        h-full 
                        bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600
                        shadow-[0_0_12px_#00eaff,0_0_18px_#9b33ff]
                        transition-all duration-300 ease-linear
                    "
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
        </section>
    );
}
