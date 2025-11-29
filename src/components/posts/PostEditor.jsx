import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";
import Thumbnail from "./Thumbnail";

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState(
    "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=2218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [showUnsplashPicker, setShowUnsplashPicker] = useState(false);

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
      await api.put(`blog/${id}`, {
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
    <div>
      <Thumbnail thumbnail={thumbnail} />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6"
      >
        <textarea
          type="text"
          id="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          maxLength="80"
          className="text-4xl font-bold bg-transparent focus:outline-none resize-none
         placeholder-gray-400 overflow-scroll overflow-x-auto overflow-y-hidden"
          required
        />
        <textarea
          className="border w-full bg-transparent resize-none focus:outline-none placeholder-gray-500 leading-relaxed whitespace-pre-wrap"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your markdown content here..."
          rows="12"
          required
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
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
