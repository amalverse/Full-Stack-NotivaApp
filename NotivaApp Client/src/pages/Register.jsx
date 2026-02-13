import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  verifyEmailOtp,
  clearError,
} from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaStickyNote, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Register, 2: Verify OTP

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle initial registration form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(registerUser({ name, username, email, password }))
      .unwrap()
      .then(() => {
        setStep(2);
        dispatch(clearError());
      })
      .catch(() => {
        // Error handled by Redux slice
      });
  };

  // Handle OTP verification form submission
  const handleVerifySubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(verifyEmailOtp({ email, otp }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/login");
          dispatch(clearError());
        }, 3000);
      })
      .catch(() => {
        // Error handled by Redux slice
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
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

        {step === 2 && message && message.includes("Email verified") ? (
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-bold text-green-700 mb-2">Success!</h3>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              {step === 1 ? "Create Account" : "Verify Email"}
            </h2>
            <p className="text-center text-gray-500">
              {step === 1
                ? "Join us to manage your tasks efficiently"
                : `Enter the verification code sent to ${email}`}
            </p>

            {/* Registration success message bubble in Step 2 */}
            {step === 2 &&
              (!message || !message.includes("Email verified")) && (
                <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-lg text-center">
                  Registration successful! check your email for the code.
                </div>
              )}

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-10"
                      placeholder="••••••••"
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
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifySubmit} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all font-medium ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            )}
          </>
        )}

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
