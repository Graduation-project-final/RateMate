import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#060640]/10 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#060640] p-6 text-center">
          <div className="flex justify-center mb-2">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
          <p className="text-white/80 mt-2">
            We've sent a verification code to your email
          </p>
        </div>

        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Verification Email Sent
          </h2>

          <p className="text-gray-600 mb-6">
            We've sent a 6-digit verification code to:
            <span className="block font-medium text-[#060640] mt-1">
              {email}
            </span>
          </p>

          <p className="text-gray-500 text-sm mb-8">
            Please check your inbox and follow the instructions to complete your
            verification.
          </p>

          <button
            onClick={handleVerifyClick}
            className="w-full flex items-center justify-center gap-2 bg-[#060640] hover:bg-[#060640]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Enter Verification Code
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p>Didn't receive the email?</p>
            <button
              className="text-[#060640] hover:text-[#060640]/80 font-medium mt-1"
              onClick={() => navigate(`/verify-otp/${email}`)}
            >
              Click here to resend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
