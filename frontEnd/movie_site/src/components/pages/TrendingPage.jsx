import { useGetMoviesQuery } from "../../redux/moviesApi";
import MovieCard from "../movies/MovieCard";

export default function TrendingPage() {
    const { data: movies = [], isLoading } = useGetMoviesQuery({});
    const trending = movies.filter((m) => m.isTrending || m.imdbRating >= 8.5);

    if (isLoading) return <h2 className="text-white p-10">Loading...</h2>;

    return (
        <div className="pt-24 px-10 text-white">
            <h1 className="text-4xl font-bold mb-6">🔥 Trending Movies</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {trending.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
