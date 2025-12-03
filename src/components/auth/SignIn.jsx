import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import api from "../utils/axios";
import Label from "./Label";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";
import AuthLayout from "./AuthLayout";
import { useSearchParams } from "react-router-dom";

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "google_failed") {
      toast.error("Google sign-in failed. Please try again.");
    }
  }, [error]);

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle={
        <>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-black font-medium underline hover:no-underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
};

const SignInForm = () => {
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
      console.error("Login failed:", error.response?.data || error.message);
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
        <Label labelName="email" />
        <input
          type="email"
          id="email"
          name="email"
          className={inputStyle}
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
          className={inputStyle}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={buttonStyle}>
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
