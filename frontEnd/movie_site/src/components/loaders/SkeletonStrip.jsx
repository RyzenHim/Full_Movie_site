import SkeletonMovieCard from "./SkeletonMovieCard";

export default function SkeletonStrip({ count = 6 }) {
    return (
        <div className="mb-12 px-2">
            <div className="h-6 w-48 bg-white/10 rounded mb-4 animate-pulse" />

            <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {Array(count)
                    .fill(0)
                    .map((_, idx) => (
                        <SkeletonMovieCard key={idx} />
                    ))}
            </div>
        </div>
    );
}
