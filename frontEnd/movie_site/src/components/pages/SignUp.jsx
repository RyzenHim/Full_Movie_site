import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(registerUser({ name, email, password }))
            .unwrap()
            .then(() => navigate("/"))
            .catch(() => { });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0B0B0D] to-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

                <h1 className="text-4xl font-bold text-center text-white mb-2">
                    Create Account
                </h1>
                <p className="text-center text-gray-300 mb-10">
                    Join MovieVerse and explore unlimited entertainment
                </p>

                <form onSubmit={submitHandler} className="space-y-6">

                    <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-12 py-4 bg-black/40 border border-white/20 rounded-2xl text-white"
                        />
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-12 py-4 bg-black/40 border border-white/20 rounded-2xl text-white"
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Create Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-12 py-4 bg-black/40 border border-white/20 rounded-2xl text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-semibold"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>

                    {error && (
                        <p className="text-red-400 text-center mt-4">{error}</p>
                    )}
                </form>

                <p className="text-gray-400 text-center mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
