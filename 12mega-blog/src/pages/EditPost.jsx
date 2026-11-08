import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import service from "@/appwrite/service";
import { Container, PostForm } from "@/components";

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }
        service.getPost(slug).then((result) => {
            // Only the author may edit a post.
            if (result && result.userId === userData?.$id) {
                setPost(result);
            } else {
                navigate("/");
            }
        });
    }, [slug, navigate, userData]);

    if (!post) {
        return (
            <div className="grid place-items-center py-24">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
            </div>
        );
    }

    return (
        <div className="py-8">
            <Container>
                <h1 className="mb-6 px-2 text-2xl font-bold text-white">Edit Post</h1>
                <PostForm post={post} />
            </Container>
        </div>
    );
};

export default EditPost;
