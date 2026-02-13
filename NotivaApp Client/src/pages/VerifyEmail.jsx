import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../utils/apiConfig";
import { FaStickyNote } from "react-icons/fa";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  // Attempt to verify the token when the component mounts
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-3 group mb-6"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <FaStickyNote className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            NotivaApp
          </h1>
        </Link>

        {status === "verifying" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Verifying...
            </h2>
            <p>Please wait while we verify your email address.</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Success!</h2>
            <p className="mb-6">{message}</p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Verification Failed
            </h2>
            <p className="mb-6">{message}</p>
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
