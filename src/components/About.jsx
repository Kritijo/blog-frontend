import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mt-12"
    >
      <h1 className="text-4xl font-extrabold mb-6 font-cursive">
        About Inkling Echo
      </h1>
      <p className="text-lg text-gray-600 mx-6 sm:max-w-2xl sm:mx-auto mb-6 leading-relaxed">
        Inkling Echo is a minimalist blog project built to explore web
        development concepts and showcase curated content on programming,
        design, and more. It's designed to offer readers a seamless experience
        and provide aspiring devs a playground for clean UI, routing, and simple
        authentication.
      </p>
      <p className="text-md text-gray-500 mx-6 sm:max-w-xl sm:mx-auto">
        Whether you're here to read or build, I hope you find inspiration,
        insight, or at least a moment of "hey, that's neat!"
      </p>
    </motion.section>
  );
};

export default About;
