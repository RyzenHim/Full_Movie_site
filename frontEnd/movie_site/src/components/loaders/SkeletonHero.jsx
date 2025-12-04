export default function SkeletonHero() {
    return (
        <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden mb-14 animate-pulse bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-shimmer"></div>

            <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-6">
                <div className="h-12 w-80 bg-white/10 rounded"></div>
                <div className="h-4 w-64 bg-white/10 rounded"></div>
                <div className="h-4 w-56 bg-white/10 rounded"></div>

                <div className="flex gap-4 mt-4">
                    <div className="h-12 w-40 bg-white/10 rounded-xl" />
                    <div className="h-12 w-40 bg-white/10 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
