import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AllNotes from "./pages/AllNotes";
import Archive from "./pages/Archive";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // Google OAuth Provider handles the context for Google Login
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Private Routes (access should ideally be protected by a wrapper) */}
            <Route path="/notes" element={<AllNotes />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/profile" element={<Profile />} />

            {/* Fallback route - Redirects to home if no other route matches */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* Toast Container for global notification display */}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
