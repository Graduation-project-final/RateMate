import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send } from "lucide-react";

const Reply = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No authentication token found.");
      setIsSubmitting(false);
      return;
    }

    const body = { reviewId, content };

    try {
      await axios.post("http://localhost:4000/api/add/replies", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Reply added successfully");
      setContent("");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(`Failed to add reply: ${error.response.data.message}`);
      } else {
        toast.error("Error while adding reply");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-[#060640] text-center">
          Reply to Review
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughtful reply..."
              className="w-full h-40 p-4 border-2 border-[#060640] rounded-lg focus:ring-2 focus:ring-[#060640] focus:border-transparent resize-none transition-all duration-300 ease-in-out"
            />
            <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
              {content.length} / 500
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || content.length === 0}
            className={`w-full bg-[#060640] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-[#0c0c80] focus:outline-none focus:ring-2 focus:ring-[#060640] focus:ring-opacity-50 transition-all duration-300 ${
              isSubmitting || content.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <span>{isSubmitting ? "Submitting..." : "Submit Reply"}</span>
            <Send size={20} />
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
      />
    </div>
  );
};

export default Reply;
