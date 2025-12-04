import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="
            w-full 
            bg-[var(--card)] 
            text-[var(--soft-text)] 
            border-t border-white/10 
            backdrop-blur-xl 
            py-14 px-10 mt-20
            transition-all
        ">
            {/* TOP GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* BRANDING */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-wide text-[var(--text)]">
                        Movie<span className="text-blue-500">Verse</span>
                    </h1>

                    <p className="text-sm leading-relaxed">
                        Your ultimate destination for movies, trending shows, and cinematic adventure.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 pt-2">
                        <a href="https://facebook.com" target="_blank">
                            <FaFacebook className="text-gray-400 hover:text-white text-xl cursor-pointer transition-all" />
                        </a>
                        <a href="https://instagram.com" target="_blank">
                            <FaInstagram className="text-gray-400 hover:text-white text-xl cursor-pointer transition-all" />
                        </a>
                        <a href="https://twitter.com" target="_blank">
                            <FaTwitter className="text-gray-400 hover:text-white text-xl cursor-pointer transition-all" />
                        </a>
                        <a href="https://youtube.com" target="_blank">
                            <FaYoutube className="text-gray-400 hover:text-white text-xl cursor-pointer transition-all" />
                        </a>
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--text)]">Quick Links</h3>
                    <ul className="space-y-3">
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/trending">Trending</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/watchlist">Watchlist</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/search">Search</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/movies">Genres</Link>
                        </li>
                    </ul>
                </div>

                {/* GENRES */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--text)]">Genres</h3>
                    <ul className="space-y-3">
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/genre/Action">Action</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/genre/Drama">Drama</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/genre/Sci-Fi">Sci-Fi</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/genre/Comedy">Comedy</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/genre/Thriller">Thriller</Link>
                        </li>
                    </ul>
                </div>

                {/* SUPPORT */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--text)]">Support</h3>
                    <ul className="space-y-3">
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/profile">Account</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/help">Help Center</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/terms">Terms of Service</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to="/privacy">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* COPYRIGHT */}
            <div className="text-center text-gray-500 text-sm mt-14">
                © {new Date().getFullYear()} MovieVerse. All rights reserved.
            </div>
        </footer>
    );
}
