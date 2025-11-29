import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Thumbnail from "../unsplash/Thumbnail";

const autoResize = (el) => {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("blog", { title, content, thumbnail });
      toast.success("Post created!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create post.");
      console.error("Failed to create post", err);
    }
  };

  return (
    <div className="">
      <Thumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6"
      >
        <textarea
          type="text"
          id="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your blog title..."
          className="text-4xl font-bold bg-transparent focus:outline-none resize-none
         placeholder-gray-400 overflow-scroll overflow-x-auto overflow-y-hidden"
          maxLength="80"
          required
        />

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            autoResize(e.target);
          }}
          placeholder="Start writing your thoughts here..."
          className="w-full bg-transparent resize-none text-lg focus:outline-none placeholder-gray-500 leading-relaxed whitespace-pre-wrap overflow-scroll overflow-x-auto overflow-y-hidden"
          required
        />

        <button
          type="submit"
          className="self-end bg-purple-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
