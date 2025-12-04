import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";

import Home from "./components/pages/Home";
import Watchlist from "./components/pages/Watchlist";
import GenrePage from "./components/pages/GenrePage";
import Login from "./components/pages/Login";
import Signup from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import MovieDetails from "./components/pages/MovieDetails";
import TrendingPage from "./components/pages/TrendingPage";
import MoviesPage from "./components/pages/MoviesPage";
import SearchResults from "./components/pages/SearchResults";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GlobalBackgroundSlider from "./components/background/GlobalBackgroundSlider";

export default function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Navbar />
      {/* <GlobalBackgroundSlider /> */}
      <div className="pt-20 min-h-full bg-[#0b0b0d] dark:bg-[#0b0b0d] ">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/search" element={<SearchResults />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/genre/:genre" element={<GenrePage />} />
          </Route>

        </Routes>
      </div>
    </>
  );
}
