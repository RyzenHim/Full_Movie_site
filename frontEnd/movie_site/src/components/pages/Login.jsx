import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { fetchWatchlist } from "../../redux/watchlistSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser({ email, password }))
            .unwrap()
            .then((res) => {
                dispatch(fetchWatchlist(res.user._id));  // load watchlist after login
                navigate("/");
            })
            .catch(() => { });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0B0B0D] to-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 animate-fadeIn">

                <h1 className="text-4xl font-bold text-center text-white mb-2">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-300 mb-10">
                    Login to your MovieVerse account
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-12 py-4 bg-black/40 border border-white/20 rounded-2xl text-white"
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-12 py-4 bg-black/40 border border-white/20 rounded-2xl text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-semibold"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {error && (
                        <p className="text-red-400 text-center mt-4">{error}</p>
                    )}
                </form>

                <p className="text-gray-400 text-center mt-8">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-400 font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
