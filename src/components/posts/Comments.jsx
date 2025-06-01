import { useState, useEffect } from "react";
import api from "../utils/axios";
import { toast } from "sonner";

const Comments = ({ user, post }) => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState(user.name || "");
    const [message, setMessage] = useState("");
    const id = parseInt(post.id);

    useEffect(() => {
        if (!post) return;

        const fetchComments = async () => {
            try {
                const res = await api.get(`home/blog/${id}/comments`);
                setComments(res.data.comments || []);
            } catch (err) {
                console.error("Failed to load comments", err.response?.data);
            }
        };

        fetchComments();
    }, [post]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const res = await api.post(`home/blog/${id}/comments`, {
                name: name || "Anonymous",
                message,
            });
            setComments((prev) => [...prev, res.data.comment]);
            setMessage("");
            toast.success("Comment uploaded!");
        } catch (err) {
            console.error("Comment failed:", err.response?.data || err.message);
            toast.error("Failed to upload comment.");
        }
    };

    return (
        <>
            <hr className="my-10" />

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>

                <form onSubmit={handleCommentSubmit} className="mb-6">
                    <input
                        type="text"
                        placeholder="Your name"
                        className="block w-full border rounded px-4 py-2 mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Your comment..."
                        className="block w-full border rounded px-4 py-2 mb-2"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Post Comment
                    </button>
                </form>

                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-gray-500">No comments yet.</p>
                    ) : (
                        comments.map((comment, index) => (
                            <div
                                key={index}
                                className="border-l-4 pl-4 border-blue-200"
                            >
                                <p className="text-gray-700">
                                    <strong>{comment.name}</strong> says:
                                </p>
                                <p className="text-gray-600">
                                    {comment.message}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
