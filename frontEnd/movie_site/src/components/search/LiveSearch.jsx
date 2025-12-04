import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchMoviesQuery } from "../../redux/moviesApi";
import { Link } from "react-router-dom";

export default function LiveSearch({ onClose }) {
    const [query, setQuery] = useState("");

    const { data: results = [], isFetching } = useSearchMoviesQuery(query, {
        skip: query.length < 1,
    });

    useEffect(() => {
        const close = (e) => {
            if (!e.target.closest(".search-dropdown")) {
                onClose();
            }
        };

        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    return (
        <div className="absolute top-16 right-0 w-80 search-dropdown">

            <div
                className="
          bg-black/80 border border-white/20 
          rounded-2xl backdrop-blur-xl shadow-2xl p-4
          animate-fadeIn
        "
            >
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                    <FaSearch className="text-gray-300" />

                    <input
                        type="text"
                        autoFocus
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="
              bg-transparent outline-none text-white w-full
              placeholder-gray-400
            "
                    />
                </div>

                {isFetching && (
                    <div className="text-gray-400 p-4 text-center">Searching…</div>
                )}

                {!isFetching && query.length > 0 && (
                    <div className="mt-3 max-h-80 overflow-y-auto no-scrollbar">
                        {results.length === 0 && (
                            <div className="text-gray-500 text-center py-4">
                                No results found.
                            </div>
                        )}

                        {results.map((movie) => (
                            <Link
                                key={movie._id}
                                to={`/movie/${movie._id}`}
                                className="
                  flex items-center gap-3 p-2 rounded-xl 
                  hover:bg-white/10 transition-all
                "
                                onClick={onClose}
                            >
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-12 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-white font-semibold">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm">{movie.year}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
