export default function SkeletonMovieCard() {
    return (
        <div className="w-56 h-80 rounded-xl overflow-hidden bg-white/10 animate-pulse">
            <div className="w-full h-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-shimmer" />
        </div>
    );
}
