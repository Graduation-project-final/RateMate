import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/Logo2.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <img
          src={logo}
          alt="Logo"
          className="mb-4 mx-auto"
          style={{ width: "100px" }}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#060640]"
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#060640] text-white rounded hover:bg-opacity-80 transition"
          >
            Send Reset Link
          </button>
        </form>
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
      />{" "}
    </div>
  );
};

export default ForgotPassword;
