import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen grid place-items-center bg-zinc-950 text-zinc-100 px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-indigo-500">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-zinc-400">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
