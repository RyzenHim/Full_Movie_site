import {
    FaFireAlt,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

import MovieCard from "../movies/MovieCard";
import { useGetMoviesQuery } from "../../redux/moviesApi";
import { useRef } from "react";

export default function TrendingSection() {
    const { data: movies = [], isLoading } = useGetMoviesQuery({});

    const trending = movies
        .filter((m) => m.isTrending || m.imdbRating >= 8.5)
        .slice(0, 20);

    const scrollRef = useRef();

    const scrollLeft = () => {
        scrollRef.current.scrollLeft -= 350;
    };

    const scrollRight = () => {
        scrollRef.current.scrollLeft += 350;
    };

    if (isLoading) {
        return (
            <div className="px-2 mb-12">
                <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-6"></div>
                <div className="flex gap-6 overflow-x-auto no-scrollbar">
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
                <h2 className="text-3xl font-bold text-white tracking-wide">
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
                className="
                    flex gap-6 overflow-x-auto no-scrollbar scroll-smooth 
                    py-3 pr-2
                "
            >
                {trending.map((movie) => (
                    <div key={movie._id} className="relative">
                        {/* 🔥 Trending Badge (inside card, not overflowing) */}
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
        </section>
    );
}
