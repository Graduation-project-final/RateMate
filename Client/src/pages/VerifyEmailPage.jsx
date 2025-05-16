import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from the query string
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const handleVerifyClick = () => {
    navigate(`/verify-otp/${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          The OTP has been sent to your email
        </h1>
        <p className="text-gray-600 mb-6">
          Check your email for the verification OTP number. Please follow the
          instructions in the email to complete the verification process.
        </p>
        <button
          onClick={handleVerifyClick}
          className="bg-[#060640] text-white font-semibold py-2 px-4 rounded hover:opacity-85"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
