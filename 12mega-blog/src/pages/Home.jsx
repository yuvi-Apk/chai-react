import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Container } from "@/components";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Write. Share. <span className="text-indigo-400">Inspire.</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-zinc-400">
        {authStatus
          ? "Welcome back! Check out the latest posts or write a new one."
          : "Login to read and publish posts on MegaBlog."}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to={authStatus ? "/all-posts" : "/login"}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-500"
        >
          {authStatus ? "Browse Posts" : "Login"}
        </Link>
        <Link
          to={authStatus ? "/add-post" : "/signup"}
          className="rounded-lg border border-zinc-700 px-5 py-2.5 font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
        >
          {authStatus ? "Add Post" : "Create Account"}
        </Link>
      </div>
    </Container>
  );
};

export default Home;
