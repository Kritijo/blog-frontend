import PostCard from "./PostCard.jsx";
import useFetch from "../utils/useFetch.jsx";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";

const Posts = () => {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, error } = useFetch(
    `home/blog?skip=${(page - 1) * limit}&limit=${limit}`
  );

  const totalPages = Math.ceil(data?.total / limit);

  return (
    <div
      style={{
        backgroundImage: `url('/assets/purple-pattern.svg')`,
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}
    >
      <h2 className="text-3xl text-center text-purple-950 font-serif font-extrabold my-6">
        All Posts
      </h2>

      {isLoading && (
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
        <p className="font-semibold font-mono text-center mt-20">{error}</p>
      )}

      {data && !data.posts.length > 0 && (
        <p className="font-semibold font-mono text-center mt-20">
          No posts yet.
        </p>
      )}

      {data && (
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-6">
          {data.posts.map((post, index) => (
            <PostCard post={post} key={index} index={index} />
          ))}
        </section>
      )}
      <Buttons setPage={setPage} page={page} totalPages={totalPages} />
    </div>
  );
};

const Buttons = ({ setPage, totalPages, page }) => {
  const buttonStyle =
    "px-4 py-2 bg-purple-300 font-semibold rounded hover:bg-purple-200 disabled:bg-gray-100 disabled:opacity-50";

  return (
    <div className="flex justify-center mt-8 gap-4 mb-10">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={buttonStyle}
      >
        Previous
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
        className={buttonStyle}
      >
        Next
      </button>
    </div>
  );
};

export default Posts;
