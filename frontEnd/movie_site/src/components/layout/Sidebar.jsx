import {
    FaSearch,
    FaFireAlt,
    FaFilm,
    FaBars,
    FaSun,
    FaMoon,
    FaUserCircle,
    FaBookmark,
    FaSignOutAlt
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { logout } from "../../redux/authSlice";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [avatarMenu, setAvatarMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const theme = useSelector((state) => state.theme.mode);
    const user = useSelector((state) => state.auth.user);

    let lastScroll = 0;

    // Auto-hide navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll && currentScroll > 70) setHidden(true);
            else setHidden(false);

            lastScroll = currentScroll;
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

    return (
        <nav
            className={`
                w-full h-16 fixed top-0 left-0 z-50
                px-8 flex items-center justify-between
                bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg
                transition-all duration-500
                ${hidden ? "-translate-y-full" : "translate-y-0"}
            `}
        >
            {/* Logo */}
            <Link to="/">
                <h1 className="text-white text-3xl font-bold cursor-pointer">
                    Movie<span className="text-blue-500">Verse</span>
                </h1>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-10 text-gray-300 items-center text-lg">

                <li className="hover:text-white cursor-pointer">
                    <Link to="/">Home</Link>
                </li>

                <li className="hover:text-white cursor-pointer flex items-center gap-2">
                    <FaFireAlt />
                    <Link to="/trending">Trending</Link>
                </li>

                <li className="hover:text-white cursor-pointer flex items-center gap-2">
                    <FaFilm />
                    <Link to="/movies">Movies</Link>
                </li>

                {/* Search Dropdown Trigger */}
                <li>
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="hover:text-white flex items-center gap-2"
                    >
                        <FaSearch /> Search
                    </button>
                </li>

                {/* Search Dropdown Box */}
                {searchOpen && (
                    <div className="absolute top-16 right-52 bg-black/70 border border-white/20 p-4 rounded-xl w-64 backdrop-blur-xl">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="
                                px-4 py-2 rounded-lg w-full 
                                bg-black/30 border border-white/20 
                                text-white outline-none
                            "
                        />
                    </div>
                )}

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setAvatarMenu(!avatarMenu)}
                        className="text-white hover:opacity-80 flex items-center gap-2"
                    >
                        <FaUserCircle size={26} />
                        <span>{user?.email || "Guest"}</span>
                    </button>

                    {avatarMenu && (
                        <div
                            className="
                                absolute right-0 top-10 
                                bg-black/70 border border-white/20 
                                rounded-xl p-4 w-48 backdrop-blur-xl
                            "
                        >
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 py-2 hover:text-blue-400"
                            >
                                <FaUserCircle /> Profile
                            </Link>

                            <Link
                                to="/watchlist"
                                className="flex items-center gap-2 py-2 hover:text-blue-400"
                            >
                                <FaBookmark /> Watchlist
                            </Link>

                            <button
                                onClick={() => dispatch(logout())}
                                className="flex w-full items-center gap-2 py-2 hover:text-red-400"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="
                        bg-white/10 backdrop-blur-xl p-3 rounded-xl 
                        border border-white/20 hover:bg-white/20
                    "
                >
                    {theme === "dark" ? (
                        <FaSun className="text-yellow-400" />
                    ) : (
                        <FaMoon className="text-blue-600" />
                    )}
                </button>
            </ul>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white text-2xl"
                onClick={() => setOpen(!open)}
            >
                <FaBars />
            </button>

            {/* Mobile Dropdown */}
            {open && (
                <div
                    className="
                        absolute top-16 right-4 w-48 bg-black/70 
                        backdrop-blur-xl text-white border border-white/20 
                        rounded-xl p-4 flex flex-col gap-4 md:hidden
                    "
                >
                    <Link to="/">Home</Link>
                    <Link to="/trending">Trending</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/profile">Profile</Link>

                    {/* Theme toggle in mobile */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="flex items-center gap-2 py-2"
                    >
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                        Theme
                    </button>
                </div>
            )}
        </nav>
    );
}
