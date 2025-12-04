import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // fake login data – replace with backend later
        const userData = { email };
        dispatch(login(userData));

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0B0B0D] to-gray-900 flex items-center justify-center p-6">

            {/* Card */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 animate-fadeIn">

                {/* Title */}
                <h1 className="text-4xl font-bold text-center text-white mb-2 tracking-wide">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-300 mb-10">
                    Login to your MovieVerse account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                w-full px-12 py-4 
                bg-black/40 border border-white/20 
                rounded-2xl text-white placeholder-gray-400
                outline-none focus:border-blue-500 transition-all
              "
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                w-full px-12 py-4 
                bg-black/40 border border-white/20 
                rounded-2xl text-white placeholder-gray-400
                outline-none focus:border-blue-500 transition-all
              "
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="
              w-full py-4 rounded-2xl 
              bg-blue-600 hover:bg-blue-700 
              text-white text-lg font-semibold
              shadow-lg hover:shadow-blue-500/30 
              transition-all
            "
                    >
                        Login
                    </button>

                </form>

                {/* Footer */}
                <p className="text-gray-400 text-center mt-8">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 hover:text-blue-500 font-semibold"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
