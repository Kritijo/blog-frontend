import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("blog", { title, content });
            toast.success("Post created!");
            navigate("/posts");
        } catch (err) {
            toast.error("Failed to create post.");
            console.error("Failed to create post", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="min-h-screen flex flex-col gap-6"
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your blog title..."
                    className="w-full text-2xl md:text-3xl font-bold bg-transparent focus:outline-none placeholder-gray-400"
                    required
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your thoughts here..."
                    className="w-full flex-1 bg-transparent resize-none text-lg focus:outline-none placeholder-gray-500 leading-relaxed whitespace-pre-wrap"
                    required
                />

                <button
                    type="submit"
                    className="self-end bg-blue-600 text-white font-serif px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Publish
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
