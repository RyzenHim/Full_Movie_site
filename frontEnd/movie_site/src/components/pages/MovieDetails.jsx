import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery, useGetMoviesQuery } from "../../redux/moviesApi";
import { FaPlay, FaPlus } from "react-icons/fa";
import SkeletonHero from "../loaders/SkeletonHero";
import MovieStrip from "../movies/MovieStrip";
import ReviewsSection from "../sections/ReviewsSection";

export default function MovieDetails() {
    const { id } = useParams();

    const { data: movie, isLoading } = useGetMovieByIdQuery(id);

    const { data: allMovies = [] } = useGetMoviesQuery({});

    // ⭐ SHIMMER LOADING FOR HERO
    if (isLoading || !movie) {
        return <SkeletonHero />;
    }

    const similar = allMovies.filter(
        (m) => m._id !== movie._id && m.genres.some((g) => movie.genres.includes(g))
    );

    return (
        <div className="min-h-screen text-white bg-[#0B0B0D]">

            {/* Backdrop Banner */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                <div className="absolute bottom-20 left-16 max-w-3xl space-y-6">
                    <h1 className="text-6xl font-extrabold drop-shadow-xl">{movie.title}</h1>

                    <div className="flex gap-5 text-gray-300 text-lg font-medium">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.ageRating}</span>
                        <span>•</span>
                        <span>{movie.runtime} min</span>
                        <span>•</span>
                        <span className="text-yellow-400 font-semibold">⭐ {movie.imdbRating}</span>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl text-lg font-bold shadow hover:bg-gray-300">
                            <FaPlay /> Watch Now
                        </button>

                        <button className="flex items-center gap-2 bg-black/60 px-8 py-3 rounded-xl border border-white/30 hover:bg-black/80">
                            <FaPlus /> Add to List
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-16 py-16 space-y-14">

                {/* Plot */}
                <div className="grid grid-cols-3 gap-14">
                    <div className="col-span-2 space-y-6">
                        <h2 className="text-3xl font-bold">Storyline</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">{movie.plot}</p>

                        <div className="flex gap-4 flex-wrap mt-4">
                            {movie.genres.map((g) => (
                                <span key={g} className="px-4 py-1.5 rounded-xl bg-white/10 border border-white/20 text-sm">
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-4 text-gray-300">
                        <h3 className="text-xl font-semibold text-white">Movie Info</h3>

                        <p><span className="text-white font-semibold">Language:</span> {movie.language}</p>
                        <p><span className="text-white font-semibold">Countries:</span> {movie.countries.join(", ")}</p>
                        <p><span className="text-white font-semibold">IMDB Votes:</span> {movie.imdbVotes}</p>
                        <p><span className="text-white font-semibold">Directors:</span> {movie.directors.join(", ")}</p>
                        <p><span className="text-white font-semibold">Writers:</span> {movie.writers.join(", ")}</p>
                        <p><span className="text-white font-semibold">Production:</span> {movie.productionCompanies.join(", ")}</p>
                    </div>
                </div>

                {/* Cast */}
                {movie.cast.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Cast</h2>

                        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
                            {movie.cast.map((actor, i) => (
                                <div
                                    key={i}
                                    className="min-w-[160px] h-28 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-lg font-medium"
                                >
                                    {actor}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Movies */}
                {similar.length > 0 && (
                    <MovieStrip title="Similar Movies" movies={similar} />
                )}

            </div>
            <ReviewsSection reviews={movie.comments} movieId={movie._id} />

        </div>
    );
}
