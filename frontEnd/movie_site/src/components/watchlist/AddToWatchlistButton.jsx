import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addMovieToWatchlist,
    removeMovieFromWatchlist,
} from "../../redux/watchlistSlice";
import { FaHeart, FaCheck } from "react-icons/fa";

export default function AddToWatchlistButton({ movie, compact = false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { list: watchlist = [] } = useSelector((state) => state.watchlist);

    const [animate, setAnimate] = useState(false);
    const [msg, setMsg] = useState("");

    const isInWatchlist = watchlist.some((m) => m._id === movie._id);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user?._id) {
            setMsg("Login required");
            setTimeout(() => setMsg(""), 1500);
            return;
        }

        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);

        if (isInWatchlist) {
            dispatch(removeMovieFromWatchlist({ userId: user._id, movieId: movie._id }));
            setMsg("Removed");
        } else {
            dispatch(addMovieToWatchlist({ userId: user._id, movieId: movie._id }));
            setMsg("Saved");
        }

        setTimeout(() => setMsg(""), 1500);
    };

    const base =
        "relative flex items-center gap-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all px-3 py-1.5 backdrop-blur-xl";

    const filled =
        "bg-pink-600/80 border-pink-300 text-white shadow-[0_0_15px_rgba(236,72,153,0.7)]";

    const glass =
        "bg-white/10 border-white/25 text-white hover:bg-white/20";

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className={`${base} ${isInWatchlist ? filled : glass} ${animate ? "scale-110" : "scale-100"
                    } transition-all`}
            >
                {isInWatchlist ? (
                    <>
                        <FaCheck /> Saved
                    </>
                ) : (
                    <>
                        <FaHeart className="text-pink-400" /> Watchlist
                    </>
                )}
            </button>

            {/* Small tooltip message */}
            {msg && (
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] px-2 py-1 rounded-full bg-black/80 text-white/90 shadow-lg whitespace-nowrap">
                    {msg}
                </div>
            )}
        </div>
    );
}
