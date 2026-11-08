import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-zinc-950 px-4 text-zinc-100">
      <div className="text-center">
        <p className="text-7xl font-bold text-indigo-500">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-zinc-400">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
