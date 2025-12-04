import { useSelector, useDispatch } from "react-redux";
import { setGenre } from "../../redux/filterSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

export default function GenreCarousel() {
    const { genres, selectedGenre } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const scrollRef = useRef();

    const scrollLeft = () => {
        scrollRef.current.scrollLeft -= 300;
    };

    const scrollRight = () => {
        scrollRef.current.scrollLeft += 300;
    };

    return (
        <section className="mb-12 px-2 relative w-full">

            <h2 className="text-3xl font-bold text-white mb-5 tracking-wide">
                Browse by Genre
            </h2>

            <div className="relative w-full">

                {/* LEFT ARROW */}
                <button
                    onClick={scrollLeft}
                    className="
                    hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20
                    bg-black/60 hover:bg-black/80 text-white
                    p-3 rounded-full border border-white/20 shadow-xl
                "
                >
                    <FaChevronLeft />
                </button>

                {/* GENRE SCROLLER */}
                <div
                    ref={scrollRef}
                    className="
                        flex gap-4 overflow-x-auto no-scrollbar 
                        py-2 scroll-smooth w-full
                    "
                >
                    {genres.map((g) => (
                        <button
                            key={g}
                            onClick={() => dispatch(setGenre(g))}
                            className={`
                                px-6 py-2 text-sm rounded-full whitespace-nowrap font-semibold
                                transition-all duration-300
                                ${selectedGenre === g
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20"
                                }
                            `}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                {/* RIGHT ARROW */}
                <button
                    onClick={scrollRight}
                    className="
                    hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20
                    bg-black/60 hover:bg-black/80 text-white
                    p-3 rounded-full border border-white/20 shadow-xl
                "
                >
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
}
