import Product from "../models/productsModel.js";
import mongoose from "mongoose";
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

    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

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

/**
 * @desc Menghapus produk beserta gambar dari Cloudinary
 * @route DELETE /api/vendor/product/:id/delete
 * @access Private/Seller
 */
export const deleteProduct = async (req, res) => {
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

    // Hapus gambar dari Cloudinary
    if (product.images && product.images.length > 0) {
      await deleteFilesFromCloudinary(product.images);
    }

    // Hapus produk dari database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Mengambil detail produk berdasarkan slug
 * @route GET /api/vendor/product/details/:slug
 * @access Seller
 */
export const getProductDetails = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug })
      .populate("category", "name")
      .populate("storeId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Helper function untuk membangun pipeline agregasi produk.
 * Fungsi ini murni dan hanya bertanggung jawab untuk membuat query.
 * @param {object} filters - Objek berisi semua filter yang mungkin.
 * @param {string} filters.storeId - ID toko.
 * @param {string} [filters.search] - Kata kunci pencarian nama.
 * @param {string} [filters.category] - ID kategori.
 * @param {string} [filters.stock] - Filter stok ('low' atau 'high').
 * @returns {Array<object>} Array pipeline agregasi MongoDB.
 */
const buildProductQueryPipeline = ({ storeId, search, category, stock }) => {
  const matchStage = {
    storeId: new mongoose.Types.ObjectId(storeId),
  };

  if (search) {
    matchStage.name = { $regex: search, $options: "i" };
  }

  if (
    category &&
    category !== "all" &&
    mongoose.Types.ObjectId.isValid(category)
  ) {
    matchStage.category = new mongoose.Types.ObjectId(category);
  }

  let pipeline = [
    {
      $addFields: {
        totalStock: {
          $cond: {
            if: { $gt: [{ $size: { $ifNull: ["$variations", []] } }, 0] },
            then: { $sum: "$variations.stock" },
            else: "$stock",
          },
        },
        discountedPrice: {
          $multiply: [
            "$price",
            { $subtract: [1, { $divide: ["$discount", 100] }] },
          ],
        },
      },
    },
    { $match: matchStage },
  ];

  const LOW_STOCK_THRESHOLD = 20;
  if (stock === "low") {
    pipeline.push({ $match: { totalStock: { $lt: LOW_STOCK_THRESHOLD } } });
  } else if (stock === "high") {
    pipeline.push({ $match: { totalStock: { $gte: LOW_STOCK_THRESHOLD } } });
  }

  return pipeline;
};

/**
 * @desc   Mengambil semua produk dengan filter, pencarian, dan paginasi
 * @route  GET /api/vendor/products
 * @access Private/Seller
 */
export const getAllProductsByStore = async (req, res) => {
  try {
    const { storeId } = req;
    const { search, category, stock, page = 1, limit = 10 } = req.query;

    const basePipeline = buildProductQueryPipeline({
      storeId,
      search,
      category,
      stock,
    });

    const totalProductsPipeline = [...basePipeline, { $count: "total" }];

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const dataPipeline = [
      ...basePipeline,
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNumber },
      // Tahap untuk meniru .populate('category', 'name')
      {
        $lookup: {
          from: "productcategories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          category: { _id: "$categoryInfo._id", name: "$categoryInfo.name" },
        },
      },
      { $project: { categoryInfo: 0 } },
    ];

    // Eksekusi kedua query secara paralel untuk efisiensi
    const [totalResult, products] = await Promise.all([
      Product.aggregate(totalProductsPipeline),
      Product.aggregate(dataPipeline),
    ]);

    const totalProducts = totalResult[0]?.total || 0;

    res.status(200).json({
      products,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        totalItems: totalProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching products.",
      error: error.message,
    });
  }
};
