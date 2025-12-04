import { Link } from "react-router-dom";

export default function ChatMessage({ msg, theme, onAddToWatchlist }) {
    const isUser = msg.from === "user";

    if (msg.type === "text") {
        const userClasses =
            theme === "dark"
                ? "bg-blue-600 text-white self-end"
                : "bg-blue-500 text-white self-end";

        const botClasses =
            theme === "dark"
                ? "bg-white/10 border border-white/20 text-white self-start"
                : "bg-gray-100 border border-gray-300 text-gray-900 self-start";

        return (
            <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${isUser ? userClasses : botClasses
                    }`}
            >
                {msg.text}
            </div>
        );
    }

    if (msg.type === "movieCard" && msg.movie) {
        const m = msg.movie;

        return (
            <div
                className={`
        self-start rounded-2xl p-3 mb-1 
        ${theme === "dark" ? "bg-white/10 border border-white/20 text-white" : "bg-gray-100 border border-gray-300 text-gray-900"}
      `}
            >
                <div className="flex gap-3">
                    <img src={m.posterUrl} alt={m.title} className="w-20 h-28 rounded-md object-cover" />
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="font-semibold text-sm">{m.title}</p>
                            <p className="text-xs opacity-80">⭐ {m.imdbRating} • {m.year}</p>
                            <p className="text-[11px] opacity-70 mt-1 line-clamp-3">{m.genres?.join(", ")}</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Link to={`/movie/${m._id}`}>
                                <button className="px-2 py-1 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                    Open
                                </button>
                            </Link>
                            {onAddToWatchlist && (
                                <button
                                    onClick={() => onAddToWatchlist(m)}
                                    className={`px-2 py-1 text-xs rounded-lg ${theme === "dark" ? "bg-white/20 hover:bg-white/30 text-white" : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                >
                                    + Watchlist
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (msg.type === "carousel" && Array.isArray(msg.movies)) {
        return (
            <div className="flex gap-3 overflow-x-auto scrollbar-thin py-1 self-start">
                {msg.movies.map((m) => (
                    <Link key={m._id} to={`/movie/${m._id}`}>
                        <img
                            src={m.posterUrl}
                            alt={m.title}
                            className="w-20 h-28 rounded-lg object-cover hover:scale-105 transition-transform"
                        />
                    </Link>
                ))}
            </div>
        );
    }

    return null;
}
