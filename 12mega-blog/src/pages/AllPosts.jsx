import { useEffect, useState } from "react";
import service from "@/appwrite/service";
import { Container, PostCard } from "@/components";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service
            .getPosts()
            .then((result) => {
                if (result) setPosts(result.rows);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="mb-6 text-2xl font-bold text-white">All Posts</h1>

                {loading ? (
                    <div className="grid place-items-center py-24">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
                    </div>
                ) : posts.length === 0 ? (
                    <p className="py-24 text-center text-zinc-400">No posts yet.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default AllPosts;
