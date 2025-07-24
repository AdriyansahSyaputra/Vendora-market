import SellerApplication from "../models/sellerApplicationsModel.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

/**
 * Fungsi helper untuk mengunggah satu file Base64 ke Cloudinary
 * @param {string} fileString - String Base64 dari file
 * @param {string} folder - Nama folder di Cloudinary
 * @returns {Promise<string>} URL file yang aman dari Cloudinary
 */
const uploadToCloudinary = async (fileString, folder) => {
  try {
    console.log("🚀 Upload dimulai...");
    const { secure_url } = await cloudinary.uploader.upload(fileString, {
      folder: folder,
      resource_type: "auto",
    });
    console.log("✅ Upload berhasil:", secure_url);
    return secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

/**
 * @desc    Membuat aplikasi pendaftaran seller baru (Metode Manual Cloudinary)
 * @route   POST /api/seller-applications/apply
 * @access  Private
 */
export const applySellerApplication = async (req, res) => {
  const userId = req.user._id;
  console.log("Data masuk:", req.body);
  try {
    // Cek duplikasi request seller
    const existingApplication = await SellerApplication.findOne({
      userId,
      status: { $in: ["pending", "approved"] },
    });
    if (existingApplication) {
      return res.status(400).json({
        message: `You have an existing application with status "${existingApplication.status}".`,
      });
    }

    //   Ambil data dari request body
    const {
      phone,
      storeName,
      storeDescription,
      categories,
      location,
      address,
      operatingArea,
      documents: docBase64,
      terms,
    } = req.body;

    const { fullName, email } = req.user;

    const uploadedDocuments = {};
    const uploadFolder = "seller-applications";

    if (location === "ID") {
      uploadedDocuments.ktp = await uploadToCloudinary(
        docBase64.ktp,
        uploadFolder
      );
      uploadedDocuments.npwp = await uploadToCloudinary(
        docBase64.npwp,
        uploadFolder
      );
    } else {
      uploadedDocuments.passport = await uploadToCloudinary(
        docBase64.passport,
        uploadFolder
      );
      uploadedDocuments.businessLicense = await uploadToCloudinary(
        docBase64.businessLicense,
        uploadFolder
      );
    }

    const newApplication = new SellerApplication({
      userId,
      fullName,
      email,
      phone,
      storeName,
      storeDescription,
      categories,
      location,
      address,
      operatingArea,
      documents: uploadedDocuments,
      status: "pending",
    });

    console.log("📝 Menyimpan SellerApplication dengan data:", {
      userId,
      fullName,
      email,
      phone,
      storeName,
      location,
      uploadedDocuments,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Seller application created successfully.",
      application: newApplication,
    });
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    console.error("📦 Stack Trace:", error.stack);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message, // tambahkan ini
      stack: error.stack, // bisa juga tambahkan sementara
    });
  }
};
