import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import GoogleIcon from "../assets/Svg/GoogleIcon.jsx";
import FacebookIcon from "../assets/Svg/FacebookIcon.jsx";
import { useAuth } from "../hooks/AuthContext.jsx";

const Login = ({ isOpen, onClose, onSignUpOpen }) => {
  const { login } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    }
  }, [location]);

  const handleGoogleSignIn = () => {
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/login",
          { email, password }
        );
        localStorage.setItem("authToken", response.data.token);
        login(response.data.token);
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
          navigate("/");
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-[30rem] z-50 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#060640] mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-[#060640] text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-all"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <a
            href="http://localhost:4000/api/auth/facebook"
            className="w-full flex items-center justify-center gap-3 bg-[#060640] text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-all"
          >
            <FacebookIcon />
            Continue with Facebook
          </a>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4 text-gray-500">
            or sign in with email
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#060640] focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#060640] focus:border-transparent transition-all pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.apiError && (
            <p className="text-red-500 text-xs mt-1">{errors.apiError}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#060640] text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <FaArrowRight />}
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <Link
            to="/forget-password"
            className="text-[#060640] hover:text-[#060640] hover:underline transition-colors"
            onClick={() => {
              onClose();
            }}
          >
            Forgot password?
          </Link>
          <div className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onSignUpOpen();
              }}
              className="text-[#060640] hover:text-[#060640] font-medium hover:underline transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
