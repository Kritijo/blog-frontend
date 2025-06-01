import blog from "../assets/blog.png";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const Hero = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75 }}
            >
                <header className="mb-12 text-center">
                    {isAuthenticated ? (
                        <h1 className="text-4xl font-extrabold mb-4 font-cursive">
                            Hi {user.name}
                        </h1>
                    ) : (
                        <h1 className="text-4xl font-extrabold mb-4 font-cursive">
                            <Typewriter
                                words={["Inkling Echo"]}
                                loop={1}
                                cursor
                                cursorStyle=""
                                typeSpeed={50}
                            />
                        </h1>
                    )}
                    <p className="text-lg text-gray-600 max-w-xl mx-auto mb-4">
                        Dive into articles on coding, design, and everything in
                        between.
                    </p>
                    <div className="border-b">
                        <img
                            src={blog}
                            alt="Blog header"
                            className="w-full h-96 object-cover"
                        ></img>
                    </div>
                    {isAuthenticated && (
                        <Link to="/create" className="flex justify-center">
                            <button className="px-4 md:px-6 py-2 md:text-lg mt-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white  font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
                                Create Post
                            </button>
                        </Link>
                    )}
                </header>
            </motion.div>
        </>
    );
};

export default Hero;
