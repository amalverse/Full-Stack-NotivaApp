import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  resetPasswordOtp,
  clearError,
} from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaStickyNote, FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & Password

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.auth);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(forgotPassword(email))
      .unwrap()
      .then(() => {
        setStep(2);
        setTimeout(() => {
          dispatch(clearError());
        }, 3000);
      })
      .catch(() => {});
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(resetPasswordOtp({ email, otp, password }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/login");
          dispatch(clearError());
        }, 3000);
      })
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-3 group mb-4"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <FaStickyNote className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            NotivaApp
          </h1>
        </Link>

        {step === 2 && message === "Password reset successful" ? (
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-bold text-green-700 mb-2">Success!</h3>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              {step === 1
                ? "Enter your email to receive a reset code"
                : `Enter the code sent to ${email}`}
            </p>

            {error && (
              <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            {/* Show success message from Step 1 (Email sent) briefly in Step 2 */}
            {step === 2 &&
              message &&
              message !== "Password reset successful" && (
                <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg text-center">
                  {message}
                </div>
              )}

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-medium ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all tracking-widest text-center text-lg font-mono"
                    placeholder="######"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-10"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-medium ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Change Email / Resend Code
                </button>
              </form>
            )}
          </>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
