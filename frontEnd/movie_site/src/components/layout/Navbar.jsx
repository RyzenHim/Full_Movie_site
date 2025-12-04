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

    const dispatch = useDispatch();
    const location = useLocation();

    const theme = useSelector((state) => state.theme.mode);
    const user = useSelector((state) => state.auth.user);

    let lastScroll = 0;

    // AUTO HIDE NAVBAR ON SCROLL
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            if (current > lastScroll && current > 70) setHidden(true);
            else setHidden(false);
            lastScroll = current;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // CLOSE MENUS ON PAGE CHANGE
    useEffect(() => {
        setOpen(false);
        setAvatarMenu(false);
        setSearchOpen(false);
    }, [location.pathname]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full h-16 px-8 z-50
            bg-black/40 backdrop-blur-xl border-b border-white/10
            flex items-center justify-between shadow-lg
            transition-all duration-500 
            ${hidden ? "-translate-y-full" : "translate-y-0"}
        `}
        >
            {/* LOGO */}
            <Link to="/">
                <h1 className="text-white text-3xl font-bold cursor-pointer">
                    Movie<span className="text-blue-500">Verse</span>
                </h1>
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex items-center gap-10 text-gray-300 text-lg">

                <li className="hover:text-white"><Link to="/">Home</Link></li>

                <li className="flex items-center gap-2 hover:text-white">
                    <FaFireAlt /> <Link to="/trending">Trending</Link>
                </li>

                <li className="flex items-center gap-2 hover:text-white">
                    <FaFilm /> <Link to="/movies">Movies</Link>
                </li>

                {/* SEARCH DROPDOWN BUTTON */}
                <li>
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="flex items-center gap-2 hover:text-white"
                    >
                        <FaSearch /> Search
                    </button>
                </li>

                {/* SEARCH INPUT */}
                {searchOpen && (
                    <div className="absolute top-16 right-52 bg-black/70 p-4 w-64 rounded-xl border border-white/20 backdrop-blur-xl">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white outline-none"
                        />
                    </div>
                )}

                {/* PROFILE MENU */}
                <div className="relative">
                    <button
                        onClick={() => setAvatarMenu(!avatarMenu)}
                        className="flex items-center gap-2 text-white hover:opacity-80"
                    >
                        <FaUserCircle size={26} />
                        <span>{user?.email || "Guest"}</span>
                    </button>

                    {avatarMenu && (
                        <div className="absolute right-0 top-10 w-48 bg-black/70 p-4 rounded-xl border border-white/20 backdrop-blur-xl">

                            <Link className="flex items-center gap-2 py-2 hover:text-blue-400" to="/profile">
                                <FaUserCircle /> Profile
                            </Link>

                            <Link className="flex items-center gap-2 py-2 hover:text-blue-400" to="/watchlist">
                                <FaBookmark /> Watchlist
                            </Link>

                            <button
                                onClick={() => dispatch(logout())}
                                className="flex items-center gap-2 py-2 hover:text-red-400 w-full text-left"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* THEME TOGGLE */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="p-3 rounded-xl bg-[var(--card)] border border-white/20 dark:border-white/10 hover:scale-110 transition"
                >
                    {theme === "dark" ? (
                        <FaSun className="text-yellow-400" size={20} />
                    ) : (
                        <FaMoon className="text-blue-600" size={20} />
                    )}
                </button>

            </ul>

            {/* MOBILE MENU BUTTON */}
            <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
                <FaBars />
            </button>

            {/* MOBILE SIDEBAR */}
            {open && (
                <div className="absolute top-16 right-4 w-48 bg-black/70 p-4 rounded-xl border border-white/20 backdrop-blur-xl flex flex-col gap-4 md:hidden text-white">
                    <Link to="/">Home</Link>
                    <Link to="/trending">Trending</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            )}
        </nav>
    );
}
