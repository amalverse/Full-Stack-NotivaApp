import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  // Sign the token with user ID and secret key, set to expire in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
