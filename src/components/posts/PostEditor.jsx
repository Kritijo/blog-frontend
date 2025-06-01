import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";

const PostEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`home/blog/${id}`);
                if (!data || data.post.authorId !== user?.id) {
                    setError("You are not authorized to edit this post.");
                    return;
                }
                setTitle(data.post.title);
                setContent(data.post.content);
            } catch (err) {
                setError("Failed to fetch post.");
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) fetchPost();
        else setError("You must be logged in to edit posts.");
    }, [id, isAuthenticated, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/v1/blog/${id}`, {
                title,
                content,
            });
            toast.success("Post updated!");
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
            toast.error("Failed to update post.");
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error)
        return (
            <div className="text-center mt-10 text-red-600 font-semibold">
                {error}
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
                Edit Your Post
            </h2>
            <form
                onSubmit={handleSubmit}
                className="min-h-screen flex flex-col gap-4"
            >
                <input
                    className="w-full text-2xl font-bold text-wrap bg-transparent focus:outline-none placeholder-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    required
                />
                <textarea
                    className="w-full flex-1 bg-transparent resize-none focus:outline-none placeholder-gray-500 leading-relaxed whitespace-pre-wrap"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your markdown content here..."
                    required
                />
                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/posts/${id}`)}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEditor;
