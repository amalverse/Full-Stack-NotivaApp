import User from "../models/User.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
} from "../utils/emailTemplates.js";
import generateToken from "../utils/tokenUtils.js";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

// Register user
// @route   POST /api/auth/register
// @access  Public
// This function handles user registration. It checks if all required fields are provided,
// checks if the user already exists, creates a new user, and sends a verification email.
const registerUser = async (req, res) => {
  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists (email or username taken)" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      username,
    });

    if (user) {
      // Generate verification token
      const verificationToken = crypto.randomBytes(20).toString("hex");
      user.verificationToken = verificationToken;

      // Generate verification OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
      user.verificationOtpExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

      await user.save();

      // Send verification email
      const verifyUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/verify/${verificationToken}`;
      const message = getVerificationEmailTemplate(verifyUrl, user.name, otp);

      try {
        await sendEmail({
          email: user.email,
          subject: "Welcome to NotivaApp - Verify Your Email",
          message,
        });

        res.status(201).json({
          message:
            "Registration successful! Please check your email to verify account.",
        });
      } catch (error) {
        // If email fails, delete user so they can try again
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({ message: "Email could not be sent" });
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
// @route   POST /api/auth/login
// @access  Public
// This function handles user login. It verifies the user's credentials (email/username and password).
// If valid and verified, it returns the user data along with a JWT token.
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email or username
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res
          .status(401)
          .json({ message: "Please verify your email first." });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify email
// @route   GET /api/auth/verify/:token
// @access  Public
// This function verifies the user's email using a token sent via email.
// It updates the user's status to verified and clears the verification token.
const verifyEmail = async (req, res) => {
  const verificationToken = req.params.token;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationOtp = undefined;
    user.verificationOtpExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify email OTP
// @route   POST /api/auth/verify-otp
// @access  Public
// This function alters the user verification process to use an OTP instead of a link.
// It verifies the OTP provided by the user against the hashed OTP in the database.
const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const verificationOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      email,
      verificationOtp,
      verificationOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationOtp = undefined;
    user.verificationOtpExpire = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
// This function checks if a user with the provided email exists.
// If found, it generates a reset token and OTP, saves them to the user record,
// and sends a password reset email to the user.
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and save to database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Token expires in 10 minutes
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Create reset url
    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

    const message = getPasswordResetEmailTemplate(resetUrl, user.name, otp);

    try {
      await sendEmail({
        email: user.email,
        subject: "NotivaApp - Password Reset Request",
        message,
      });

      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
// This function resets the user's password using a valid reset token.
// It hashes the token to match with the database, checks for expiration,
// and if valid, updates the password and clears reset fields.
const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.resetPasswordOtp = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password OTP
// @route   POST /api/auth/reset-password-otp
// @access  Public
// This function resets the user's password using a valid OTP.
// It verifies the OTP, checks for expiration, and updates the password if valid.
const resetPasswordOtp = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const resetPasswordOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      email,
      resetPasswordOtp,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Google Login
// @route   POST /api/auth/google
// @access  Public
// This function handles Google OAuth login. It verifies the Google token,
// checks if the user exists, and either logs them in or registers a new user.
const googleLogin = async (req, res) => {
  const { code } = req.body;
  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage",
    );

    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.avatar) {
        user.avatar = picture;
      }
      await user.save();
    } else {
      const randomPassword = crypto.randomBytes(16).toString("hex");
      user = await User.create({
        name,
        email,
        password: randomPassword,
        googleId,
        avatar: picture,
        isVerified: true,
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Google login failed" });
  }
};

// GitHub Login
// @route   POST /api/auth/github
// @access  Public
// This function handles GitHub OAuth login. It exchanges the authorization code for an access token,
// fetches user data from GitHub, and either logs the user in or registers them.
const githubLogin = async (req, res) => {
  const { code } = req.body;
  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).json({ message: "Failed to access Github token" });
    }

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const githubUser = userResponse.data;
    const primaryEmail =
      emailResponse.data.find((e) => e.primary && e.verified)?.email ||
      githubUser.email;

    if (!primaryEmail) {
      return res.status(400).json({
        message: "No public or verified email found in GitHub account",
      });
    }

    let user = await User.findOne({ email: primaryEmail });

    if (user) {
      if (!user.githubId) {
        user.githubId = githubUser.id.toString();
      }
      if (!user.avatar) {
        user.avatar = githubUser.avatar_url;
      }
      await user.save();
    } else {
      const randomPassword = crypto.randomBytes(16).toString("hex");
      user = await User.create({
        name: githubUser.name || githubUser.login,
        email: primaryEmail,
        password: randomPassword,
        githubId: githubUser.id.toString(),
        avatar: githubUser.avatar_url,
        isVerified: true,
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "GitHub login failed" });
  }
};

// Update Profile
// @route   PUT /api/auth/profile
// @access  Private
// updates the authenticated user's profile information (name, email, username, password).
// checks if the new username is already taken by another user.
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.username) {
        const existingUser = await User.findOne({
          username: req.body.username,
        });
        if (
          existingUser &&
          existingUser._id.toString() !== user._id.toString()
        ) {
          return res.status(400).json({ message: "Username is already taken" });
        }
        user.username = req.body.username;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
// @route   DELETE /api/auth/profile
// @access  Private
// This function deletes the authenticated user's account from the database.
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user data
// @route   GET /api/auth/me
// @access  Private
// This function returns the currently authenticated user's data.
// The user object is attached to the request by the auth middleware.
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

export {
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
};
