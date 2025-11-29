import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const Hero = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const headingStyle =
    "text-4xl lg:text-5xl font-bold pt-6 mb-4 text-purple-950";

  return (
    <>
      <header className="text-center bg-gradient-to-b from-purple-100 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75 }}
        >
          <h1 className={`${headingStyle}`}>
            <Typewriter
              key={isAuthenticated ? "logged-in" : "logged-out"}
              words={isAuthenticated ? [`Hi ${user.name}`] : ["Inkling Echo"]}
              loop={1}
              cursor
              cursorStyle=""
              typeSpeed={50}
            />
          </h1>

          <p className="text-lg font-medium text-purple-950 pb-2">
            Dive into articles on coding, design, and everything in between.
          </p>
          {isAuthenticated && (
            <Link to="/create">
              <button
                className="px-4 md:px-6 py-2 md:text-lg mt-3 lg:mt-4 
            bg-gradient-to-r from-purple-400 to-purple-300 text-white font-semibold rounded-xl 
            shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
              >
                Create Post
              </button>
            </Link>
          )}
        </motion.div>
      </header>

      <div className={"relative h-[40vh] -z-20 -mb-[30vh]"}>
        <div
          className="[clip-path:polygon(0_0,100%_0,100%_calc(100%-18vw),0%_100%)] bg-purple-100 absolute h-full w-full"
          style={{
            backgroundImage: `url('/assets/hero-pattern.svg')`,
            backgroundRepeat: "repeat",
            backgroundSize: "120px 120px",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 w-full -rotate-12 -translate-x-[10%]">
          <div className="h-10 w-[120%] bg-gradient-to-r from-purple-100 to-purple-400"></div>
          <div className="h-10 w-[120%] bg-gradient-to-r from-purple-200 to-purple-300"></div>
          <div className="h-10 w-[120%] bg-gradient-to-r from-purple-300 to-purple-100"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
