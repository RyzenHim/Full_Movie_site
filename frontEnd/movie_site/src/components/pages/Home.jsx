import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../redux/moviesApi";

import HeroSection from "../hero/HeroSection";
import MovieStrip from "../movies/MovieStrip";
import TrendingSection from "../sections/TrendingSection";
import Footer from "../layout/Footer";
import GlobalBackgroundSlider from "../background/GlobalBackgroundSlider";
import ChatbotWidget from "../chatbot/ChatbotWidget";

import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");
    const filterState = useSelector((state) => state.filter);

    const { data: movies = [] } = useGetMoviesQuery({
        q: search,
        genre: filterState.selectedGenre,
        language: filterState.selectedLanguage,
        minRating: filterState.minRating,
        sortBy: filterState.sortBy,
    });

    const heroMovie = movies[0];

    const GENRE_SECTIONS = [
        "Action",
        "Adventure",
        "Sci-Fi",
        "Drama",
        "Comedy",
        "Thriller",
        "Horror",
        "Romance",
        "Animation",
        "Crime",
        "Fantasy",
    ];

    return (
        <div className="relative w-full text-white bg-[#0B0B0D] pb-20">

            {/* Background Blur Slider */}
            <GlobalBackgroundSlider />

            {/* PAGE CONTAINER WITH BEAUTIFUL MARGINS */}
            <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-20">

                <div className="space-y-20 pt-24">

                    <HeroSection movie={heroMovie} movies={movies.slice(0, 10)} />

                    <TrendingSection />

                    {GENRE_SECTIONS.map((genre) => {
                        const genreMovies = movies.filter((m) =>
                            m.genres?.includes(genre)
                        );

                        if (!genreMovies.length) return null;

                        return (
                            <MovieStrip
                                key={genre}
                                title={`${genre} Movies`}
                                movies={genreMovies}
                            />
                        );
                    })}

                    {/* FOOTER */}
                    <Footer />
                </div>

            </div>

            <ChatbotWidget />
        </div>
    );
}
