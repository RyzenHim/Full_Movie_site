import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery, useGetMoviesQuery } from "../../redux/moviesApi";
import { FaPlay } from "react-icons/fa";
import SkeletonHero from "../loaders/SkeletonHero";
import MovieStrip from "../movies/MovieStrip";
import ReviewsSection from "../sections/ReviewsSection";
import AddToWatchlistButton from "../watchlist/AddToWatchlistButton";

export default function MovieDetails() {
    const { id } = useParams();

    const { data: movie, isLoading } = useGetMovieByIdQuery(id);
    const { data: allMovies = [] } = useGetMoviesQuery({});

    if (isLoading || !movie) {
        return <SkeletonHero />;
    }

    const similar = allMovies.filter(
        (m) => m._id !== movie._id && m.genres.some((g) => movie.genres.includes(g))
    );

    return (
        <div className="min-h-screen text-white relative">

            {/* Background gradient */}
            <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#050509] via-[#050712] to-[#0b0b0d]" />
            <div className="fixed inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_top,_#3b82f6_0,_transparent_55%)]" />

            {/* Backdrop Banner */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />

                {/* Glass info panel over banner */}
                <div className="absolute bottom-16 left-6 sm:left-12 max-w-3xl">
                    <div className="bg-black/55 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-xl">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap gap-3 text-gray-300 text-sm sm:text-base font-medium mt-4">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.ageRating}</span>
                            <span>•</span>
                            <span>{movie.runtime} min</span>
                            <span>•</span>
                            <span className="text-yellow-400 font-semibold">
                                ⭐ {movie.imdbRating}
                            </span>
                        </div>

                        <p className="mt-4 text-gray-200 text-sm sm:text-base line-clamp-3">
                            {movie.plot}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-4">
                            {movie.genres.map((g) => (
                                <span
                                    key={g}
                                    className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm tracking-wide"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-wrap gap-4 mt-6">

                            {/* Watch now button */}
                            <button className="flex items-center gap-2 bg-white text-black px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-lg font-bold shadow hover:bg-gray-200 transition">
                                <FaPlay /> Watch Now
                            </button>

                            {/* ⭐ Add to watchlist button (FIXED) */}
                            <AddToWatchlistButton movie={movie} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-8 lg:px-16 py-12 space-y-14">

                {/* Story + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

                    {/* Storyline */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                Storyline
                            </h2>
                            <p className="text-gray-200 text-sm sm:text-lg leading-relaxed">
                                {movie.plot}
                            </p>
                        </div>
                    </div>

                    {/* Movie Info */}
                    <div>
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.6)] space-y-3 text-gray-200 text-sm sm:text-base">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Movie Info
                            </h3>

                            <p>
                                <span className="text-white font-semibold">Language: </span>
                                {movie.language}
                            </p>
                            <p>
                                <span className="text-white font-semibold">Countries: </span>
                                {movie.countries.join(", ")}
                            </p>
                            <p>
                                <span className="text-white font-semibold">IMDB Votes: </span>
                                {movie.imdbVotes}
                            </p>
                            <p>
                                <span className="text-white font-semibold">Directors: </span>
                                {movie.directors.join(", ")}
                            </p>
                            <p>
                                <span className="text-white font-semibold">Writers: </span>
                                {movie.writers.join(", ")}
                            </p>
                            <p>
                                <span className="text-white font-semibold">Production: </span>
                                {movie.productionCompanies.join(", ")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cast */}
                {movie.cast.length > 0 && (
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Cast</h2>

                        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
                            {movie.cast.map((actor, i) => (
                                <div
                                    key={i}
                                    className="min-w-[150px] h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-sm sm:text-lg font-medium text-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                >
                                    {actor}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Movies */}
                {similar.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold">Similar Movies</h2>
                        <MovieStrip title="You may also like" movies={similar} />
                    </div>
                )}
            </div>

            {/* Reviews */}
            <div className="px-4 sm:px-8 lg:px-16 pb-16">
                <ReviewsSection reviews={movie.comments} movieId={movie._id} />
            </div>
        </div>
    );
}
