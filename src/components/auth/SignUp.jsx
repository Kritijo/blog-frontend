import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Label from "./Label";
import { toast } from "sonner";
import api from "../utils/axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await api.post("user/signup", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created! Redirecting...");
            setTimeout(() => navigate("/signin"), 1500);
        } catch (error) {
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
                    Create an account 🌸
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <Label labelName="name" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="Jane"
                            required
                        />
                    </div>
                    <div>
                        <Label labelName="email" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <Label labelName="password" />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <Label labelName="confirm" />
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            value={formData.confirm}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign Up
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="text-blue-600 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default SignUp;
