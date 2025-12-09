import {
    FaSearch,
    FaFireAlt,
    FaFilm,
    FaBars,
    FaSun,
    FaMoon,
    FaUserCircle,
    FaBookmark,
    FaSignOutAlt,
} from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { logout } from "../../redux/authSlice";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useSearchMoviesQuery } from "../../redux/moviesApi";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [avatarMenu, setAvatarMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const [query, setQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const searchRef = useRef(null);

    const theme = useSelector((state) => state.theme.mode);
    const user = useSelector((state) => state.auth.user);

    const { data: results = [] } = useSearchMoviesQuery(query, { skip: !query.trim() });

    const [hidden, setHidden] = useState(false);
    let lastScroll = 0;

    // Auto hide navbar
    useEffect(() => {
        const handleScroll = () => {
            const curr = window.scrollY;
            setHidden(curr > lastScroll && curr > 80);
            lastScroll = curr;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setOpen(false);
        setAvatarMenu(false);
        setSearchOpen(false);
    }, [location.pathname]);

    // Click outside close for search
    useEffect(() => {
        const close = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };
        if (searchOpen) document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [searchOpen]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!results.length) return;

        if (e.key === "ArrowDown") {
            setHighlightIndex((prev) => (prev + 1) % results.length);
        }

        if (e.key === "ArrowUp") {
            setHighlightIndex((prev) => (prev - 1 + results.length) % results.length);
        }

        if (e.key === "Enter") {
            const movie = results[highlightIndex];
            if (movie) navigate(`/movie/${movie._id}`);
        }
    };

    // NavLink Active Style
    const navLinkStyle = ({ isActive }) =>
        `
        px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-300
        dark:text-gray-300 text-gray-700
        ${isActive
            ? "dark:bg-white/10 bg-black/10 dark:text-white text-black shadow-lg backdrop-blur-xl"
            : "hover:dark:bg-white/10 hover:bg-black/10 hover:text-black dark:hover:text-white"
        }
    `;

    return (
        <>
            {/* Dark overlay when search opens */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
            )}

            {/* NAVBAR */}
            <nav
                className={`fixed top-0 left-0 w-full h-16 px-6 sm:px-10 z-50
                    flex items-center justify-between
                    backdrop-blur-xl border-b
                    dark:bg-black/40 bg-white/40
                    dark:border-white/10 border-black/10
                    transition-transform duration-500
                    ${hidden ? "-translate-y-full" : "translate-y-0"}
                `}
            >
                {/* LOGO */}
                <Link to="/">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-wide dark:text-white text-black">
                        Movie<span className="text-blue-500">Verse</span>
                    </h1>
                </Link>

                {/* DESKTOP MENU */}
                <ul className="hidden md:flex items-center gap-8 text-lg">

                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>

                    <NavLink to="/trending" className={navLinkStyle}>
                        <FaFireAlt /> Trending
                    </NavLink>

                    <NavLink to="/movies" className={navLinkStyle}>
                        <FaFilm /> Movies
                    </NavLink>

                    {/* SEARCH BUTTON */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center gap-2 dark:text-gray-300 text-gray-700 
                                   hover:text-black dark:hover:text-white"
                    >
                        <FaSearch /> Search
                    </button>

                    {/* PROFILE DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setAvatarMenu(!avatarMenu)}
                            className="flex items-center gap-2 dark:text-white text-black"
                        >
                            <FaUserCircle size={26} />
                            <span>{user?.email || "Guest"}</span>
                        </button>

                        {avatarMenu && (
                            <div className="absolute right-0 top-12 w-52
                                backdrop-blur-xl dark:bg-black/80 bg-white/80
                                border dark:border-white/10 border-black/10
                                shadow-2xl rounded-xl p-4 space-y-3 animate-fadeIn"
                            >
                                <NavLink to="/profile" className="flex gap-2 items-center dark:text-white text-black">
                                    <FaUserCircle /> Profile
                                </NavLink>

                                <NavLink to="/watchlist" className="flex gap-2 items-center dark:text-white text-black">
                                    <FaBookmark /> Watchlist
                                </NavLink>

                                <button
                                    onClick={() => dispatch(logout())}
                                    className="flex gap-2 items-center text-red-500 w-full text-left"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="p-3 rounded-xl backdrop-blur-xl 
                                   dark:bg-white/10 bg-black/10
                                   dark:border-white/20 border-black/20 
                                   hover:scale-110 transition shadow-md"
                    >
                        {theme === "dark"
                            ? <FaSun className="text-yellow-400" size={20} />
                            : <FaMoon className="text-blue-500" size={20} />}
                    </button>
                </ul>

                {/* MOBILE MENU BUTTON */}
                <button className="md:hidden dark:text-white text-black text-2xl" onClick={() => setOpen(!open)}>
                    <FaBars />
                </button>
            </nav>

            {/* SEARCH POPUP — FIXED VERSION */}
            {searchOpen && (
                <div
                    ref={searchRef}
                    className="
                        fixed top-24 left-1/2 -translate-x-1/2 w-[420px]
                        backdrop-blur-xl dark:bg-black/90 bg-white/90
                        border dark:border-white/10 border-black/10
                        p-6 rounded-2xl shadow-2xl z-[60] animate-scaleIn
                    "
                >
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setHighlightIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search movies..."
                        autoFocus
                        className="
                            w-full px-4 py-3 rounded-xl 
                            dark:bg-black/40 bg-white/50
                            dark:text-white text-black
                            border dark:border-white/20 border-black/20
                            focus:border-blue-400 outline-none
                        "
                    />

                    {/* SEARCH RESULTS */}
                    {query && results.length > 0 && (
                        <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
                            {results.map((movie, i) => (
                                <div
                                    key={movie._id}
                                    onClick={() => navigate(`/movie/${movie._id}`)}
                                    className={`
                                        flex items-center gap-4 p-3 rounded-xl cursor-pointer transition
                                        ${highlightIndex === i ? "bg-blue-600/30" : "hover:dark:bg-white/10 hover:bg-black/10"}
                                    `}
                                >
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-14 h-20 object-cover rounded-md"
                                    />

                                    <div>
                                        <h3 className="dark:text-white text-black font-semibold">
                                            {movie.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {movie.plot}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {query && results.length === 0 && (
                        <p className="text-gray-500 text-sm mt-4 text-center">
                            No movies found
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
