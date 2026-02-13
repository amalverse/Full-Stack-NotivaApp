import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  verifyEmail,
  verifyEmailOtp,
  forgotPassword,
  resetPassword,
  resetPasswordOtp,
  updateUser,
  deleteUser,
  googleLogin,
  githubLogin,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

// Route for user login
router.post("/login", loginUser);

// Social Login routes
// Route for Google OAuth login
router.post("/google", googleLogin);
// Route for GitHub OAuth login
router.post("/github", githubLogin);

// Password Reset Flow
// Route to request a password reset
router.post("/forgot-password", forgotPassword);
// Route to reset password with a token
router.put("/reset-password/:resetToken", resetPassword);
// Route to reset password with an OTP
router.post("/reset-password-otp", resetPasswordOtp);

// Email Verification Flow
router.get("/verify/:token", verifyEmail);
router.post("/verify-otp", verifyEmailOtp);

// Protected Routes (require authentication)
router.get("/me", protect, getMe); // Get current user
router.put("/profile", protect, updateUser); // Update profile
router.delete("/profile", protect, deleteUser); // Delete account

export default router;
