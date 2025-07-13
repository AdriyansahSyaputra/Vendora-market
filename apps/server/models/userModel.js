import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin", "staff", "finance"],
      default: "buyer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    phone: {
      type: String,
      trim: true,
    },
    addresses: {
      type: [
        {
          label: { type: String },
          addressLine1: { type: String, required: true },
          addressLine2: { type: String },
          city: { type: String, required: true },
          state: { type: String, required: true },
          postalCode: { type: String, required: true },
          country: { type: String, required: true },
          isDefault: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
