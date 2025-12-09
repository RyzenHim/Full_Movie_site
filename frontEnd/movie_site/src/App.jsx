import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayouts from "./components/layout/RootLayouts";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
import NotFound from "./components/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ROOT LAYOUT (Navbar + global wrappers) */}
      <Route element={<RootLayouts />}>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/search" element={<SearchResults />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/genre/:genre" element={<GenrePage />} />
        </Route>
      </Route>

      {/* AUTH PAGES (no navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* 404 PAGE */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
