import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../utils/useFetch";
import api from "../utils/axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import Comments from "./Comments.jsx";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "sonner";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);

    const { data, loading, error } = useFetch(`home/blog/${id}`);
    const post = data?.post;

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirmDelete) return;

        try {
            await api.delete(`blog/${id}`);
            toast.success("Post deleted.");
            navigate("/posts");
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
            toast.error("Deletion failed.");
        }
    };

    if (loading)
        return (
            <p className="font-semibold font-mono text-center mt-20">
                Loading
                <Typewriter
                    words={["..."]}
                    loop={0}
                    cursor
                    cursorStyle=""
                    typeSpeed={100}
                />
            </p>
        );
    if (error || !post)
        return (
            <div className="text-center mt-20 text-red-500 font-semibold">
                {error || "Post not found."}
            </div>
        );

    const canEdit = isAuthenticated && user?.id === post.authorId;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h1 className="text-4xl font-bold text-gray-800">
                    {post.title}
                </h1>

                {canEdit && (
                    <div className="flex gap-4">
                        <Link
                            to={`/posts/${id}/edit`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <p className="text-sm text-gray-500 mb-8">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                })}
            </p>
            <article className="prose whitespace-pre-line prose-lg text-lg max-w-none text-gray-800">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {post.content}
                </ReactMarkdown>
            </article>

            <Comments user={user} post={post} />
        </div>
    );
};

export default PostDetails;
