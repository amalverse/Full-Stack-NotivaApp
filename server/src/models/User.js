import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Username is optional but must be unique if provided
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    // IDs for OAuth providers
    googleId: {
      type: String,
    },
    githubId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    // Verification and Reset Password fields
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationOtp: String,
    verificationOtpExpire: Date,
    resetPasswordToken: String,
    resetPasswordOtp: String,
    resetPasswordExpire: Date,
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // Cleaner JSON output
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// Method to verify entered password against hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving to database
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
