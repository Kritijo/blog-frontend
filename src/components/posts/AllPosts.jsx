import PostCard from "./PostCard.jsx";
import useFetch from "../utils/useFetch.jsx";
import { Typewriter } from "react-simple-typewriter";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Posts = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <AllPosts />
        </>
    );
};

const Buttons = ({ setPage, totalPages, page }) => {
    return (
        <div className="flex justify-center mt-8 gap-4 mb-10">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                Previous
            </button>
            <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

const AllPosts = () => {
    const [page, setPage] = useState(1);
    const limit = 8;
    const { data, loading, error } = useFetch(
        `home/blog?skip=${(page - 1) * limit}&limit=${limit}`
    );
    const totalPages = Math.ceil(data?.total / limit);
    return (
        <>
            <h2 className="text-2xl text-center font-bold mb-6 underline">
                All Posts
            </h2>

            {loading && (
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
            )}
            {error && (
                <p className="font-semibold font-mono text-center mt-20">
                    {error}
                </p>
            )}

            {data && !data.posts.length > 0 && (
                <p className="font-semibold font-mono text-center mt-20">
                    No posts yet.
                </p>
            )}

            {data && (
                <section className="grid gap-8 md:grid-cols-3">
                    {data.posts.map((post, index) => (
                        <PostCard post={post} key={index} index={index} />
                    ))}
                </section>
            )}
            <Buttons setPage={setPage} page={page} totalPages={totalPages} />
        </>
    );
};

export default Posts;
