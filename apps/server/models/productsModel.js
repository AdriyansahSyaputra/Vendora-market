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
      required: [true, "Product name is required"],
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
      required: [true, "Price is required"],
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
      required: [true, "Category is required"],
      index: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      trim: true,
    },
    promos: {
      type: [String],
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
      required: [true, "At least one image is required"],
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Images array cannon be empty",
      ],
    },
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      height: {
        type: Number,
        min: 0,
      },
      width: {
        type: Number,
        min: 0,
      },
      length: {
        type: Number,
        min: 0,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual untuk total stok
productSchema.virtual("totalStock").get(function () {
  if (this.variations && this.variations.length > 0) {
    return this.variations.reduce(
      (total, variation) => total + variation.stock,
      0
    );
  }
  return this.stock;
});

// Virtual untuk harga setelah diskon
productSchema.virtual("discountedPrice").get(function () {
  return this.price * (1 - this.discount / 100);
});

// Hook untuk menghitung total stok
productSchema.pre("validate", function (next) {
  if (this.variations && this.variations.length > 0) {
    this.stock = this.variations.reduce(
      (total, variation) => total + variation.stock,
      0
    );
  }
  next();
});

// Hook untuk membuat slug
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.index(
  { storeId: 1, name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

export default mongoose.model("Product", productSchema);
