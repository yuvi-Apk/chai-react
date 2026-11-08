import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Container } from "@/components";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
        Write. Share. <span className="text-indigo-400">Inspire.</span>
      </h1>
      <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
        {authStatus
          ? "Welcome back! Check out the latest posts or write a new one."
          : "Login to read and publish posts on MegaBlog."}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to={authStatus ? "/all-posts" : "/login"}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
        >
          {authStatus ? "Browse Posts" : "Login"}
        </Link>
        <Link
          to={authStatus ? "/add-post" : "/signup"}
          className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-200 font-medium hover:bg-zinc-800 transition-colors"
        >
          {authStatus ? "Add Post" : "Create Account"}
        </Link>
      </div>
    </Container>
  );
};

export default Home;
