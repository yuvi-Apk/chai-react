import { Link } from "react-router";
import service from "../appwrite/service";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-colors group-hover:border-indigo-500/60">
        <div className="aspect-video w-full overflow-hidden bg-zinc-800">
          <img
            src={service.getFileView(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h2 className="p-4 text-lg font-semibold text-white">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
