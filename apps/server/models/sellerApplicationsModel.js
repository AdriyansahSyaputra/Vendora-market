import mongoose from "mongoose";

const sellerApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    storeName: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
    },
    storeDescription: {
      type: String,
      required: [true, "Store description is required"],
      trim: true,
    },
    categories: {
      type: [String],
      required: [true, "At least one category is required"],
    },
    location: {
      type: String,
      required: [true, "Business location is required"],
    },
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
        trim: true,
      },
      village: {
        type: String,
        trim: true,
      },
      district: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
      },
    },
    operatingArea: {
      type: [String],
      required: [true, "Operating area is required"],
    },
    documents: {
      ktp: { type: String },
      npwp: { type: String },
      passport: { type: String },
      businessLicense: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SellerApplication", sellerApplicationSchema);
