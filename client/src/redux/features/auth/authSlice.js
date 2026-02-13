import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../utils/apiConfig";

// Async thunk for logging in a user
// Sends a POST request to /api/auth/login and stores the user data in localStorage on success
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for registering a user
// Sends a POST request to /api/auth/register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for Google login
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for GitHub login
export const githubLogin = createAsyncThunk(
  "auth/githubLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/github`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "GitHub login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for reset password via OTP
export const resetPasswordOtp = createAsyncThunk(
  "auth/resetPasswordOtp",
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for verify email via OTP
export const verifyEmailOtp = createAsyncThunk(
  "auth/verifyEmailOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify email");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for deleting user account
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      localStorage.removeItem("user");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isAuthenticated: !!user,
  isLoading: false,
  error: null,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Login cases - handle loading, success (save user), and error states
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Google Login cases
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // GitHub Login cases
      .addCase(githubLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(githubLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(githubLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Forgot Password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Reset Password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Reset Password OTP cases
      .addCase(resetPasswordOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(resetPasswordOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPasswordOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Verify Email OTP cases
      .addCase(verifyEmailOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(verifyEmailOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.message = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete User cases
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = "Account deleted successfully";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
