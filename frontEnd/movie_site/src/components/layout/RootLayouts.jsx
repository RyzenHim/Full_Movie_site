import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function RootLayouts() {
    const theme = useSelector((state) => state.theme.mode);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.add("light");
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="min-h-screen bg-bg text-text transition-colors duration-500">
            <Navbar />
            <div className="pt-20 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    );
}
