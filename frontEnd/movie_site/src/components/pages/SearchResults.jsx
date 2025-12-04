import { useSearchParams } from "react-router-dom";
import { useGetMoviesQuery } from "../../redux/moviesApi";
import MovieCard from "../movies/MovieCard";

export default function SearchResults() {
    const [params] = useSearchParams();
    const q = params.get("q") || "";

    const { data: movies = [], isLoading } = useGetMoviesQuery({ q });

    if (isLoading) return <p className="text-white p-10">Loading...</p>;

    return (
        <div className="pt-24 px-10 text-white">
            <h1 className="text-3xl font-bold mb-4">
                🔎 Search Results for: <span className="text-blue-400">{q}</span>
            </h1>

            {movies.length === 0 && (
                <p className="opacity-70">No movies found.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
