import { useEffect, useState } from "react";
import { useGetMoviesQuery } from "../../redux/moviesApi";

export default function GlobalBackgroundSlider() {
    const { data: movies = [] } = useGetMoviesQuery({});
    const banners = movies.slice(0, 10); // pick first 10 posters

    const [index, setIndex] = useState(0);

    // Auto slide every 5 sec
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    if (!banners.length) return null;

    return (
        <div
            className="
            fixed inset-0 z-0 
            overflow-hidden pointer-events-none
        "
        >
            {/* SLIDING IMAGE */}
            <img
                key={index}
                src={banners[index]?.posterUrl}
                className="
                absolute inset-0 w-full h-full object-cover 
                opacity-90 blur-xl 
                transition-opacity duration-[2500ms] ease-in-out
            "
            />

            {/* DARK OVERLAY FOR READABILITY */}
            <div className="absolute inset-0 bg-black/70" />
        </div>
    );
}
