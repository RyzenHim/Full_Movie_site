import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        // fake signup – later replace with backend API
        const userData = { name, email };
        dispatch(login(userData));

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0B0B0D] to-gray-900 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 animate-fadeIn">

                {/* Title */}
                <h1 className="text-4xl font-bold text-center text-white mb-2 tracking-wide">
                    Create Account
                </h1>
                <p className="text-center text-gray-300 mb-10">
                    Join MovieVerse and explore unlimited entertainment
                </p>

                {/* Form */}
                <form onSubmit={submitHandler} className="space-y-6">

                    {/* Name */}
                    <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="
                w-full px-12 py-4 bg-black/40 
                border border-white/20 rounded-2xl text-white
                outline-none focus:border-blue-500
              "
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                w-full px-12 py-4 bg-black/40 
                border border-white/20 rounded-2xl text-white
                outline-none focus:border-blue-500
              "
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Create Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                w-full px-12 py-4 bg-black/40 
                border border-white/20 rounded-2xl text-white
                outline-none focus:border-blue-500
              "
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="
              w-full py-4 rounded-2xl 
              bg-blue-600 hover:bg-blue-700 
              text-white text-lg font-semibold
              shadow-lg hover:shadow-blue-500/30 transition-all
            "
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-gray-400 text-center mt-8">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-500 font-semibold"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
