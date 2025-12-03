import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "./Label";
import { toast } from "sonner";
import api from "../utils/axios";
import AuthLayout from "./AuthLayout";

const SignUp = () => {
  return (
    <AuthLayout
      title="Create an account 🌸"
      subtitle={
        <>
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-black font-medium underline hover:no-underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
};

const SignUpForm = () => {
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

  const inputStyle =
    "mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300";

  const buttonStyle =
    "w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white font-semibold py-2 rounded-lg hover:from-purple-400 hover:to-purple-300 transition-colors";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <Label labelName="name" />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputStyle}
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
          className={inputStyle}
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
          className={inputStyle}
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
          className={inputStyle}
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit" className={buttonStyle}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
