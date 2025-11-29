import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className="bg-white shadow-md p-6 hover:shadow-xl transition-shadow flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/posts/${post.id}`}
        aria-label={`Read post: ${post.title}`}
        className="flex flex-col flex-1"
      >
        <div className="w-full bg-purple-50 mb-[20px] object-contain">
          <img src="https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=2218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        <h3 className="text-xl font-semibold mb-2 hover:text-purple-900 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-700 mb-4 flex-1 line-clamp-3">{post.content}</p>
        <time className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </time>
      </Link>
    </motion.article>
  );
};

export default PostCard;
