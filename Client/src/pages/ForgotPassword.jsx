import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, LockKeyhole, ArrowRight } from "lucide-react";
import logo from "../assets/images/Logo2.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/reset-password-request",
        {
          email,
        }
      );

      toast.success(response.data.message || "Password reset link sent!");

      setTimeout(() => {}, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong.");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060640]/10 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#060640] p-6 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="h-24
             bg-white rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
          <p className="text-white/80 mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#060640]" />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border-b-2 border-[#060640]/20 focus:border-[#060640] focus:outline-none bg-transparent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#060640] hover:bg-[#060640]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-[#060640] hover:text-[#060640]/70 text-sm font-medium inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to login
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ForgotPassword;
