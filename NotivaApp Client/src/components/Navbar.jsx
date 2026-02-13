import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { setSearchFilter } from "../redux/features/notes/noteSlice";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaStickyNote,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { filter } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center space-x-8">
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <FaStickyNote className="text-white text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  NotivaApp
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Your smart notes</p>
              </div>
            </Link>

            {/* Navigation Links - Only show when authenticated */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/notes"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  Notes
                </Link>
                <Link
                  to="/archive"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  Archive
                </Link>
              </div>
            )}
          </div>

          {/* Right Section - Search & User Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Bar - Show when authenticated */}
            {isAuthenticated && (
              <div className="hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={filter.search}
                    onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                    className="w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-200 transition-all duration-200"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>
              </div>
            )}

            {/* Mobile Search Toggle */}
            {isAuthenticated && (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="sm:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <FaSearch className="text-lg" />
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user?.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <FaUserCircle className="text-xl" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-700 leading-tight">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      {user?.email?.substring(0, 20)}
                      {user?.email?.length > 20 ? "..." : ""}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    ></div>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden animate-fade-in-down">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-br from-purple-50 to-blue-50 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {user?.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUserCircle className="mr-3 text-lg text-gray-400 group-hover:text-blue-600" />
                          <div>
                            <p className="font-medium">Profile</p>
                            <p className="text-xs text-gray-500">
                              Manage your account
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                        >
                          <FaSignOutAlt className="mr-3 text-lg group-hover:translate-x-1 transition-transform" />
                          <div className="text-left">
                            <p className="font-medium">Sign out</p>
                            <p className="text-xs text-red-500">
                              See you soon!
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Auth Buttons for non-authenticated users */
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isAuthenticated && showSearch && (
          <div className="sm:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                value={filter.search}
                onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-200 transition-all duration-200"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
