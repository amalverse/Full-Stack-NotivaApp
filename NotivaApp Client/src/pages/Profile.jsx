import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateProfile,
  deleteUser,
  clearError,
} from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const { user, isLoading, error, message } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state with user data or defaults
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Track the user ID to prevent redundant state updates
  const lastUserId = useRef(user?._id);

  // Update local state when user data changes in Redux store
  useEffect(() => {
    if (user && user._id !== lastUserId.current) {
      lastUserId.current = user._id;
      // Use setTimeout to avoid synchronous state update warnings during render phase
      setTimeout(() => {
        setName(user.name);
        setUsername(user.username || "");
        setEmail(user.email);
      }, 0);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setLocalError("");
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    dispatch(updateProfile({ name, username, email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          {/* ... (headers and messages) */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Profile
          </h2>

          {message && (
            <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg">
              {message}
            </div>
          )}

          {(error || localError) && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-lg">
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
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
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Set a username"
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
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password (optional)
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-10"
                  placeholder="Leave blank to keep current"
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-10"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-red-600 mb-4">
              Danger Zone
            </h3>
            <button
              onClick={() => {
                // Custom confirmation toast
                toast.warning(
                  ({ closeToast }) => (
                    <div>
                      <p className="font-semibold mb-3">
                        Are you sure you want to delete your account?
                      </p>
                      <p className="text-sm mb-4">
                        This action cannot be undone.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            closeToast();
                            // Dispatch deleteUser thunk
                            dispatch(deleteUser())
                              .unwrap()
                              .then(() => {
                                toast.success("Account deleted successfully");
                                navigate("/login");
                              })
                              .catch((err) => {
                                toast.error(err || "Failed to delete account");
                              });
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={closeToast}
                          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all font-medium text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ),
                  {
                    position: "top-center",
                    autoClose: false,
                    closeButton: false,
                    draggable: false,
                  },
                );
              }}
              className="w-full py-2.5 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 focus:ring-4 focus:ring-red-100 transition-all font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
