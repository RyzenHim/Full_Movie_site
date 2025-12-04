import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../redux/moviesApi";

import Sidebar from "../layout/Sidebar";
import HeroSection from "../hero/HeroSection";
import MovieStrip from "../movies/MovieStrip";
import ChatbotWidget from "../chatbot/ChatbotWidget";
import TrendingSection from "../sections/TrendingSection";
import SkeletonHero from "../loaders/SkeletonHero";
import SkeletonStrip from "../loaders/SkeletonStrip";
import GenreCarousel from "../sections/GenreCarousel";
import Footer from "../layout/Footer";
import GlobalBackgroundSlider from "../background/GlobalBackgroundSlider";

import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");
    const filterState = useSelector((state) => state.filter);

    const { data: movies = [], isLoading } = useGetMoviesQuery({
        q: search,
        genre: filterState.selectedGenre,
        language: filterState.selectedLanguage,
        minRating: filterState.minRating,
        sortBy: filterState.sortBy,
    });

    const heroMovie = movies[0];

    // if (isLoading) {
    //     return (
    //         <div className="flex">
    //             <Sidebar />

    //             <div className="ml-72 w-full pl-10 pr-10 pt-24 space-y-14">
    //                 <GenreCarousel />
    //                 <SkeletonHero />
    //                 <TrendingSection />
    //                 <SkeletonStrip count={7} />
    //                 <SkeletonStrip count={7} />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className=" relative w-full text-white bg-[#0B0B0D] overflow-hidden">

            <GlobalBackgroundSlider />

            <div className="flex border w-screen">
                <Sidebar />

                <div className=" w-full p-4 pt-24 pb-20 space-y-14">

                    {heroMovie && <HeroSection movie={heroMovie} />}
                    {/* <HeroSection /> */}

                    <GenreCarousel />

                    <TrendingSection />

                    {/* <MovieStrip title="Latest Releases" movies={movies} /> */}
                    {/* <MovieStrip
                        title="Top Rated"
                        movies={movies.filter(m => m.imdbRating >= 8.5)}
                    /> */}

                    <Footer />
                </div>
            </div>

            <ChatbotWidget />
        </div>
    );
}
