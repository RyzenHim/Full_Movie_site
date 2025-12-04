import { useDispatch, useSelector } from "react-redux";
import {
    setGenre,
    setLanguage,
    setMinRating,
    setSortBy,
    clearFilters,
} from "../../redux/filterSlice";

export default function FilterPanel() {
    const dispatch = useDispatch();
    const { genres, languages, selectedGenre, selectedLanguage, minRating, sortBy } =
        useSelector((state) => state.filter);

    const anyFilterActive =
        selectedGenre ||
        selectedLanguage ||
        minRating > 1 ||
        sortBy !== "";

    return (
        <div
            className="
            p-5 w-72
            backdrop-blur-xl 
            rounded-2xl shadow-xl 
            text-white border border-white/10
            sticky top-24
            transition-all duration-300
        "
        >

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>

                <button
                    onClick={() => dispatch(clearFilters())}
                    className={`
                        px-3 py-1 rounded-lg text-xs font-semibold
                        transition-all
                        ${anyFilterActive
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-white/10 text-gray-500 cursor-not-allowed"}
                    `}
                    disabled={!anyFilterActive}
                >
                    Clear
                </button>
            </div>

            <div className="mb-6">
                <p className="text-sm font-semibold text-gray-300 mb-2">Genres</p>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => {
                        const active = selectedGenre === genre;

                        return (
                            <button
                                key={genre}
                                onClick={() => dispatch(setGenre(genre))}
                                className={`
                                    px-3 py-1 rounded-xl text-sm transition-all border
                                    ${active
                                        ? "bg-blue-500 border-blue-400 text-white"
                                        : "bg-white/10 border-white/20 hover:bg-white/20"}
                                `}
                            >
                                {genre}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm font-semibold text-gray-300 mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => {
                        const active = selectedLanguage === lang;

                        return (
                            <button
                                key={lang}
                                onClick={() => dispatch(setLanguage(lang))}
                                className={`
                                    px-3 py-1 rounded-xl text-sm transition-all border
                                    ${active
                                        ? "bg-green-500 border-green-400 text-white"
                                        : "bg-white/10 border-white/20 hover:bg-white/20"}
                                `}
                            >
                                {lang}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm font-semibold text-gray-300 mb-2">
                    Minimum Rating ({minRating})
                </p>

                <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={minRating}
                    className="w-full accent-green-500 cursor-pointer"
                    onChange={(e) => dispatch(setMinRating(e.target.value))}
                />
            </div>

            <div className="mb-2">
                <p className="text-sm font-semibold text-gray-300 mb-2">Sort By</p>

                <select
                    value={sortBy}
                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                    className="
                        w-full px-3 py-2 rounded-xl bg-black/40 
                        border border-white/20 text-white outline-none
                        hover:bg-black/60 transition-all
                    "
                >
                    <option value="">Default</option>
                    <option value="ratingDesc">Rating (High → Low)</option>
                    <option value="yearDesc">Year (Newest → Oldest)</option>
                    <option value="titleAsc">Title (A → Z)</option>
                </select>
            </div>
        </div>
    );
}
