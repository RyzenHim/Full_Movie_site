import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewsSection({ reviews = [], movieId }) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [reviewText, setReviewText] = useState("");

    async function submitReview() {
        if (!rating || !reviewText.trim()) return;

        await fetch(`http://localhost:3000/api/movies/${movieId}/review`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating, text: reviewText }),
        });

        setRating(0);
        setReviewText("");

        window.location.reload();
    }

    return (
        <section className="text-white mt-20">

            <h2 className="text-3xl font-bold mb-6">Reviews</h2>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-10">

                <h3 className="text-xl font-semibold mb-3">Add Your Review</h3>

                <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={28}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                            onClick={() => setRating(star)}
                            className={`
                cursor-pointer transition-all 
                ${star <= (hovered || rating) ? "text-yellow-400" : "text-gray-500"}
              `}
                        />
                    ))}
                </div>

                <textarea
                    rows="3"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts…"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 outline-none text-white"
                />

                <button
                    onClick={submitReview}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold shadow"
                >
                    Submit Review
                </button>
            </div>

            <div className="space-y-6">
                {reviews.length === 0 && (
                    <p className="text-gray-400">No reviews yet. Be the first!</p>
                )}

                {reviews.map((r, idx) => (
                    <div
                        key={idx}
                        className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {Array(r.rating)
                                .fill(0)
                                .map((_, i) => (
                                    <FaStar key={i} size={18} className="text-yellow-400" />
                                ))}
                        </div>

                        <p className="text-gray-300 leading-relaxed">{r.text}</p>

                        <p className="text-sm text-gray-500 mt-2">
                            — {r.userName || "Anonymous User"}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
}
