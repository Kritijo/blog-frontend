import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import api from "../utils/axios";
import Label from "./Label";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post("user/signin", {
                email,
                password,
            });
            await login();
            toast.success("Signed in successfully");
            navigate("/");
        } catch (error) {
            console.error(
                "Login failed:",
                error.response?.data || error.message
            );
            toast.error(error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem-5rem)] flex items-center justify-center">
            <motion.div
                key="form"
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-bold text-center mb-6 font-cursive text-gray-800">
                    Welcome Back 👋
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <Label labelName="email" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label labelName="password" />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default SignIn;
