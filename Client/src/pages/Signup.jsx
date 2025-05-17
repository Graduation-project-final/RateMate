import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import GoogleIcon from "../assets/Svg/GoogleIcon";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import FacebookIcon from "../assets/Svg/FacebookIcon";

const SignUp = ({ isOpen, onClose, onLoginOpen }) => {
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/register",
          {
            name,
            email,
            password,
            role: "user",
          }
        );

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Please verify your email",
        }).then(() => {
          onClose();
          navigate(`/Verify-email?email=${encodeURIComponent(email)}`);
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.response?.data?.message || "Something went wrong!",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm overflow-y-auto py-8">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-[28rem] max-h-[90vh] overflow-y-auto z-50 border border-gray-100">
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

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#060640] mb-1">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">Get started with your journey</p>
        </div>

        <div className="space-y-3 mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-[#060640] text-white font-medium py-2.5 px-4 rounded-xl hover:opacity-90 transition-all text-sm"
          >
            <GoogleIcon className="w-4 h-4" />
            Sign up with Google
          </button>
          <a
            href="http://localhost:4000/api/auth/facebook"
            className="w-full flex items-center justify-center gap-2 bg-[#060640] text-white font-medium py-2.5 px-4 rounded-xl hover:opacity-90 transition-all text-sm"
          >
            <FacebookIcon className="w-4 h-4" />
            Sign up with Facebook
          </a>
        </div>

        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-3 text-gray-500 text-sm">
            or sign up with email
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#060640] focus:border-transparent transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#060640] focus:border-transparent transition-all"
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
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#060640] focus:border-transparent transition-all pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#060640] text-white font-medium py-2.5 px-4 rounded-xl hover:opacity-90 transition-all text-sm shadow-md mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
            {!isSubmitting && <FaArrowRight size={14} />}
          </button>
        </form>

        <div className="flex justify-center items-center mt-4 text-sm">
          <div className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onLoginOpen();
              }}
              className="text-[#060640] hover:text-[#060640] font-medium hover:underline transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
