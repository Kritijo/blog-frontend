import { motion } from "framer-motion";

const Google = () => {
  return (
    <div className="mt-4">
      <button
        className="flex items-center justify-center gap-2 border w-full py-2 font-medium rounded-lg hover:bg-gray-50 transition"
        onClick={() => {
          window.location.href = `${
            import.meta.env.VITE_API_BASE_URL
          }auth/google`;
        }}
      >
        <img src="/google-icon.svg" alt="Google" className="h-5 md:h-6" />
        Continue with Google
      </button>
    </div>
  );
};

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-start justify-center pt-24">
      <motion.div
        key="form"
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h2>
        <p className="text-sm text-center mb-6 text-gray-500">{subtitle}</p>
        {children}
        <Google />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
