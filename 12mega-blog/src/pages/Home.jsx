import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import service from "@/appwrite/service";
import { Container, PostCard } from "@/components";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);

  // Posts are shown to logged-in users only (same as the All Posts page).
  useEffect(() => {
    if (!authStatus) {
      setPosts([]);
      return;
    }
    service.getPosts().then((result) => {
      if (result) setPosts(result.rows);
    });
  }, [authStatus]);

  return (
    <>
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

      {posts.length > 0 && (
        <Container className="pb-16">
          <h2 className="mb-6 text-xl font-semibold text-white">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.slice(0, 8).map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
