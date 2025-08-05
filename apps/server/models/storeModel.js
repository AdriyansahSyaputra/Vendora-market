import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
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
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
      },
    },
    logo: {
      type: String,
    },
    banner: {
      type: String,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Store", storeSchema);
