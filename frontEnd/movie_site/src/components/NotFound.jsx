import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="h-screen w-full bg-[#0B0B0D] flex items-center justify-center text-white relative overflow-hidden">

            {/* GLOWING BACKGROUND BLOB */}
            <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-purple-600 opacity-20 blur-[150px]"></div>
            <div className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-blue-600 opacity-20 blur-[150px]"></div>

            {/* MAIN CARD */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 bg-white/10 backdrop-blur-2xl px-12 py-16 rounded-3xl shadow-2xl border border-white/20 text-center max-w-xl"
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-xl"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-2xl font-semibold text-gray-300 mt-4"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-gray-400 mt-3 leading-relaxed"
                >
                    The page you're looking for doesn't exist or has been moved.
                    Don't worry — let's get you back on track.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="mt-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition rounded-xl shadow-lg"
                    >
                        <FaHome size={20} />
                        Go Back Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
