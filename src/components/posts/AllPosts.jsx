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
            {isAuthenticated && <UserPosts />}
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

const UserPosts = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const { data, loading, error } = useFetch(
        `blog?skip=${(page - 1) * limit}&limit=${limit}`
    );
    const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

    return (
        <>
            <Format
                heading={"Your Posts"}
                loading={loading}
                error={error}
                data={data?.userPosts}
            />
            <Buttons setPage={setPage} page={page} totalPages={totalPages} />
        </>
    );
};

const AllPosts = () => {
    const [page, setPage] = useState(1);
    const limit = 4;
    const { data, loading, error } = useFetch(
        `home/blog?skip=${(page - 1) * limit}&limit=${limit}`
    );
    const totalPages = Math.ceil(data?.total / limit);
    return (
        <>
            <Format
                heading={"All Posts"}
                loading={loading}
                error={error}
                data={data?.posts}
            />
            <Buttons setPage={setPage} page={page} totalPages={totalPages} />
        </>
    );
};

const Format = ({ heading, loading, error, data }) => {
    return (
        <>
            <h2 className="text-2xl text-center font-bold mb-6 underline">
                {heading}
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

            {data && data.length > 0 ? (
                <section className="grid gap-8 md:grid-cols-3">
                    {data.map((post, index) => (
                        <PostCard post={post} key={index} index={index} />
                    ))}
                </section>
            ) : (
                <p className="font-semibold font-mono text-center my-20">
                    No posts yet.
                </p>
            )}
        </>
    );
};

export default Posts;
