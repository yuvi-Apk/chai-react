import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import service from "@/appwrite/service";
import { Button, Container } from "@/components";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    service.getPost(slug).then((result) => {
      if (result) setPost(result);
      else navigate("/");
    });
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    const deleted = await service.deletePost(post.$id);
    if (deleted) {
      await service.deleteFile(post.featuredImage);
      navigate("/all-posts");
    }
  };

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
        <div className="relative mb-6 flex w-full justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
            className="max-h-[480px] w-full object-cover"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600">Edit</Button>
              </Link>
              <Button bgColor="bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <h1 className="mb-6 text-3xl font-bold text-white">{post.title}</h1>
        <div className="post-content text-zinc-200">
          {parse(post.content || "")}
        </div>
      </Container>
    </div>
  );
};

export default Post;
