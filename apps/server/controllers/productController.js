import Product from "../models/productsModel.js";
import {
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
} from "../utils/cloudinaryUtils.js";

/**
 * @desc Membuat produk baru
 * @route POST /api/vendor/product/create
 * @access Private/Seller
 */
export const createProduct = async (req, res) => {
  const storeId = req.storeId;
  const {
    name,
    description,
    price,
    discount,
    category,
    stock,
    promos,
    variations,
    weight,
    dimensions,
    status,
  } = req.body;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required." });
  }

  try {
    const uploadFolder = `products/${storeId}`;
    const imageUrls = await uploadFilesToCloudinary(req.files, uploadFolder);

    const newProduct = new Product({
      storeId,
      name,
      description,
      price,
      discount,
      category,
      stock: variations && variations.length > 0 ? 0 : stock,
      promos,
      variations,
      images: imageUrls,
      weight,
      dimensions,
      status,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "A product with this name already exists in your store.",
      });
    }
    // Error lainnya
    res.status(500).json({
      message: "Server error while creating product.",
      error: err.message,
    });
  }
};

/**
 * @desc Update data produk
 * @route PUT /api/vendor/product/:id/update
 * @access Private/Seller
 */
export const updateProduct = async (req, res) => {
  const storeId = req.storeId;
  const { id: productId } = req.params;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Otorisasi untuk memastikan user adalah pemilik toko dari produk ini
    if (product.storeId.toString() !== storeId.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    let existingImages = [];
    if (req.body.images) {
      existingImages = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    const imagesToDelete = product.images.filter(
      (url) => !existingImages.includes(url)
    );

    if (imagesToDelete.length > 0) {
      await deleteFilesFromCloudinary(imagesToDelete);
    }

    const uploadFolder = `products/${storeId}`;
    const newImageUrls = req.files
      ? await uploadFilesToCloudinary(req.files, uploadFolder)
      : [];

    const updatedImageUrls = [...existingImages, ...newImageUrls];

    const allowedUpdates = [
      "name",
      "description",
      "price",
      "discount",
      "category",
      "stock",
      "promos",
      "variations",
      "weight",
      "dimensions",
      "status",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (["variations", "dimensions", "promos"].includes(field)) {
          try {
            product[field] = JSON.parse(req.body[field]);
          } catch (e) {
            product[field] = req.body[field];
          }
        } else {
          product[field] = req.body[field];
        }
      }
    });

    if (req.body.name) {
      product.markModified("name");
    }

    product.images = updatedImageUrls;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "A product with this name already exists in your store.",
      });
    }

    res.status(500).json({
      message: "Server error while updating product.",
      error: err.message,
    });
  }
};

// Ambil list data product berdasarkan kategori
export const getProductsByStore = async (req, res) => {
  const storeId = req.storeId;

  if (!storeId) {
    return res.status(500).json({
      message: "Store ID tidak ditemukan di request. Middleware mungkin gagal.",
    });
  }

  try {
    const products = await Product.find({
      storeId: storeId,
    })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products retrieved successfully",
      count: products.length,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
