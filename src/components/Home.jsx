import Hero from "./Hero.jsx";
import PostCard from "./posts/PostCard";
import useFetch from "./utils/useFetch.jsx";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Home = () => {
    const { data, loading, error } = useFetch("home/blog?limit=6");
    return (
        <>
            <Hero />

            <h2 className="text-2xl font-bold mb-6 underline">Latest Posts</h2>

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
                    "No posts yet."
                </p>
            )}

            {data && (
                <section className="grid gap-8 md:grid-cols-3">
                    {data.posts.map((post, index) => (
                        <PostCard post={post} key={index} index={index} />
                    ))}
                </section>
            )}

            <Link to="/posts" className="flex justify-center">
                <button className="px-4 md:px-6 py-2 md:text-lg mt-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
                    All Posts →
                </button>
            </Link>
        </>
    );
};

export default Home;
