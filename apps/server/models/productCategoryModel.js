import mongoose from "mongoose";
import slugify from "slugify";

const productCategorySchema = new mongoose.Schema(
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
    },
    description: {
      type: String,
      trim: true,
    },
    productsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productCategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Membuat compound index untuk memastikan slug unik per storeId
productCategorySchema.index({ storeId: 1, slug: 1 }, { unique: true });

export default mongoose.model("ProductCategory", productCategorySchema);
