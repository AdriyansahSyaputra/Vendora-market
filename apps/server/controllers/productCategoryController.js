import ProductCategory from "../models/productCategoryModel.js";
import slugify from "slugify";

/**
 * @desc Buat kategori produk baru
 * @route POST /api/vendor/product-category/create
 * @access Private/Seller
 */
export const createProductCategory = async (req, res) => {
  const storeId = req.storeId;
  const { name, description } = req.body;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  try {
    let existingCategory = await ProductCategory.findOne({ storeId, name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists in your store.",
      });
    }

    const newCategory = new ProductCategory({
      storeId,
      name,
      description,
    });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({
      message: "Server error while creating category.",
      error: err.message,
    });
  }
};

/**
 * @desc Update kategori produk
 * @route PUT /api/vendor/product-category/:id/update
 * @access Private/Seller
 */
export const updateProductCategory = async (req, res) => {
  const storeId = req.storeId;
  const { name, description } = req.body;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  const categoryFields = {};
  if (name) {
    categoryFields.name = name;
    categoryFields.slug = slugify(name, { lower: true, strict: true });
  }

  if (req.body.hasOwnProperty("description")) {
    categoryFields.description = description;
  }

  try {
    let category = await ProductCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Otorisasi untuk memastikan user adalah pemilik toko dari kategori ini
    if (category.storeId.toString() !== storeId.toString()) {
      return res.status(403).json({
        message:
          "Access denied. You can only update categories from your own store.",
      });
    }

    // Cek duplikasi nama jika name diubah
    if (name && name !== category.name) {
      const existingCategory = await ProductCategory.findOne({
        storeId: storeId,
        name: name,
        _id: { $ne: req.params.id },
      });

      if (existingCategory) {
        return res.status(400).json({
          message: "Category with this name already exists in your store.",
        });
      }
    }

    category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      { $set: categoryFields },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Category updated successfully",
      category: category,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Hapus kategori produk
 * @route DELETE /api/vendor/product-category/:id/delete
 * @access Private/Seller
 */
export const deleteProductCategory = async (req, res) => {
  const storeId = req.storeId;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  try {
    const category = await ProductCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Otorisasi untuk memastikan user adalah pemilik toko dari kategori ini
    if (category.storeId.toString() !== storeId.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (category.productsCount > 0) {
      return res.status(400).json({
        message: "Cannot delete categories that still have products.",
      });
    }

    await ProductCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Mengambil semua data kategori produk
 * @route GET /api/vendor/product-category
 * @access Private/Seller
 */
export const getAllProductCategories = async (req, res) => {
  const storeId = req.storeId;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  try {
    const categories = await ProductCategory.find({
      storeId: storeId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Categories retrieved successfully",
      count: categories.length,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
