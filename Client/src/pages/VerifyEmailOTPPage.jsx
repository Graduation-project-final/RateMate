import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/AuthContext";
import { Mail, Lock, RotateCw, ArrowRight, ChevronLeft } from "lucide-react";

const VerifyEmailOTPPage = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleOtpChange = (index, value, event) => {
    const newOtp = [...otp];

    if (event.key === "Backspace" && !value) {
      if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-${index - 1}`).focus();
      }
    } else if (/^\d*$/.test(value) && value.length <= 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyClick = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "OTP Required",
        text: "Please enter the 6-digit OTP sent to your email.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        { email, otp: otpString }
      );

      const token = response.data.token;
      login(token);

      Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text: "Your email has been verified successfully!",
      }).then(() => {
        navigate("/uprofile");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/resend-otp",
        { email }
      );

      Swal.fire({
        icon: "success",
        title: "OTP Resent",
        text: response.data.message || "OTP has been resent to your email!",
      });
      setTimer(60);
      setIsResendDisabled(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Resend Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isResendDisabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060640]/10 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#060640] p-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 text-white hover:text-white/80 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">Email Verification</h1>
          <div className="flex items-center justify-center mt-4">
            <Mail className="h-6 w-6 text-white mr-2" />
            <span className="text-white/90">{email}</span>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 mx-auto text-[#060640] mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">
              Enter Verification Code
            </h2>
            <p className="text-gray-600 mt-2">
              We've sent a 6-digit code to your email
            </p>
          </div>

          <div className="flex justify-center space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value, e)}
                onKeyDown={(e) => handleOtpChange(index, "", e)}
                className="w-12 h-12 text-2xl text-center border-b-2 border-[#060640]/30 focus:border-[#060640] focus:outline-none bg-transparent"
                maxLength={1}
                required
              />
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={handleVerifyClick}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#060640] hover:bg-[#060640]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <RotateCw className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                onClick={handleResendOtp}
                disabled={isResendDisabled}
                className={`text-[#060640] hover:text-[#060640]/80 text-sm font-medium inline-flex items-center ${
                  isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <RotateCw className="h-4 w-4 mr-1" />
                {isResendDisabled ? `Resend code in ${timer}s` : "Resend code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOTPPage;
