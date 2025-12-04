import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../movies/MovieCard";
import { removeFromWatchlist } from "../../redux/watchlistSlice";
import { FaTrash } from "react-icons/fa";

export default function Watchlist() {
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.watchlist.list);

    return (
        <div className="min-h-screen bg-[#0B0B0D] text-white pt-24 px-16 pb-20">

            <h1 className="text-4xl font-bold mb-10 tracking-wide">My Watchlist</h1>

            {watchlist.length === 0 && (
                <div className="text-gray-400 text-xl mt-20 text-center">
                    Your watchlist is empty.
                    <div className="mt-2 text-gray-500">
                        Add movies by clicking the <strong>+</strong> button on any card.
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {watchlist.map((movie) => (
                    <div key={movie._id} className="relative group">

                        <button
                            onClick={() => dispatch(removeFromWatchlist(movie._id))}
                            className="
                absolute -top-3 -right-3 z-20
                bg-red-600 hover:bg-red-700 
                p-2 rounded-full text-white text-sm
                shadow-md opacity-0 group-hover:opacity-100
                transition-all duration-200
              "
                        >
                            <FaTrash size={14} />
                        </button>

                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}
