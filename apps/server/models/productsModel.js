import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
      index: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      trim: true,
    },
    isPromo: {
      type: Boolean,
      default: false,
    },
    soldCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    variations: [
      {
        size: {
          type: String,
          trim: true,
        },
        color: {
          type: String,
          trim: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
          trim: true,
        },
      },
    ],
    images: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    weight: {
      type: Number,
      min: 0,
      trim: true,
    },
    dimensions: {
      height: {
        type: Number,
        min: 0,
        trim: true,
      },
      width: {
        type: Number,
        min: 0,
        trim: true,
      },
      length: {
        type: Number,
        min: 0,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Product", productSchema);
