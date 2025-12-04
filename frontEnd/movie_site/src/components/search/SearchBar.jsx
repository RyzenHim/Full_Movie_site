import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
    return (
        <div
            className="
        w-full max-w-xl
        flex items-center gap-3
        bg-black/40 backdrop-blur-xl
        border border-white/20
        px-4 py-3 rounded-2xl
        shadow-lg
      "
        >
            <FaSearch className="text-gray-300" size={18} />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search movies, actors, genres…"
                className="
          w-full bg-transparent outline-none
          text-white text-base placeholder-gray-400
        "
            />
        </div>
    );
}
