import { useParams } from "react-router-dom";
import { useGetMoviesQuery } from "..//../redux/moviesApi";
import MovieCard from "../movies/MovieCard";
import SkeletonStrip from "../loaders/SkeletonStrip";

export default function GenrePage() {
    const { genre } = useParams();

    const { data: movies = [], isLoading } = useGetMoviesQuery({ genre });

    const filtered = movies.filter((m) => m.genres.includes(genre));

    if (isLoading) {
        return (
            <div className="pt-24 px-16">
                <SkeletonStrip count={8} />
                <SkeletonStrip count={8} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0B0D] text-white pt-24 px-16 pb-20">

            {/* CATEGORY TITLE */}
            <h1 className="text-5xl font-extrabold mb-3 tracking-wide">
                {genre}
            </h1>

            <p className="text-gray-400 mb-10 text-lg">
                Explore the best of {genre} movies.
            </p>

            {/* EMPTY STATE */}
            {filtered.length === 0 && (
                <div className="text-gray-400 text-xl mt-20">
                    No movies found in this category.
                </div>
            )}

            {/* MOVIE GRID */}
            <div className="
        grid grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-10
      ">
                {filtered.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
