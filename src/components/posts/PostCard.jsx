import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.article
            ref={ref}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                to={`/posts/${post.id}`}
                aria-label={`Read post: ${post.title}`}
                className="flex flex-col flex-1"
            >
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-gray-700 mb-4 flex-1 line-clamp-3">
                    {post.content}
                </p>{" "}
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
