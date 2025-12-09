import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";
import MovieCard from "./MovieCard"; // adjust path if needed

export default function MovieStrip({ title, movies }) {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    if (!movies || movies.length === 0) return null;

    const updateProgress = () => {
        const el = scrollRef.current;
        if (!el) return;

        const max = el.scrollWidth - el.clientWidth;
        const progress = max > 0 ? (el.scrollLeft / max) * 100 : 0;

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

    return (
        <section className="mb-14 px-4 relative w-full overflow-hidden">

            {/* SECTION TITLE */}
            <h2 className="text-3xl font-bold text-white tracking-wide mb-5 drop-shadow-xl">
                {title}
            </h2>

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

            {/* STRIP SCROLLER */}
            <div
                ref={scrollRef}
                onScroll={updateProgress}
                className="
                    flex gap-6 
                    overflow-x-auto cyberpunk-scrollbar
                    scroll-smooth py-3 pr-2
                "
            >
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
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

            {/* NEON PROGRESS BAR */}
            <div className="w-full h-1.5 mt-4 bg-black/30 rounded-full overflow-hidden border border-white/10 backdrop-blur-xl">
                <div
                    className="
                        h-full 
                        bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600
                        shadow-[0_0_12px_#00eaff,0_0_18px_#9b33ff]
                        transition-all duration-300 ease-linear
                    "
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
        </section>
    );
}
