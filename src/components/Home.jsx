import Hero from "./Hero.jsx";
import PostCard from "./posts/PostCard";
import useFetch from "./utils/useFetch.jsx";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useFetch("home/blog?limit=6");
  const baseFont = "font-semibold font-mono text-center";
  return (
    <>
      <Hero />

      {loading && (
        <p className={baseFont}>
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
      {error && <p className={baseFont}>{error}</p>}

      {data && !data.posts.length > 0 && (
        <p className={baseFont}>No posts yet.</p>
      )}

      {data && (
        <section className="relative mx-5 md:mx-[20vh] grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {data.posts.map((post, index) => (
            <PostCard post={post} key={index} index={index} />
          ))}
        </section>
      )}

      <div className="flex justify-center my-10">
        <Link to="/posts">
          <button className="px-4 md:px-6 py-2 md:text-lg bg-purple-200 text-purple-600 font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
            All Posts →
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
