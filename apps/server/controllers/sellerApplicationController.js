import SellerApplication from "../models/sellerApplicationsModel.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Store from "../models/storeModel.js";
import { sendNotificationToUser } from "../config/socket.js";
import { sendStatusUpdateEmail } from "../services/emailService.js";
import Notification from "../models/notificationsModel.js";
import mongoose from "mongoose";

/**
 * Fungsi helper untuk mengunggah satu file Base64 ke Cloudinary
 * @param {string} fileString - String Base64 dari file
 * @param {string} folder - Nama folder di Cloudinary
 * @returns {Promise<string>} URL file yang aman dari Cloudinary
 */
const uploadToCloudinary = async (fileString, folder) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(fileString, {
      folder: folder,
      resource_type: "auto",
    });

    return secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

/**
 * Mengekstrak public_id dari URL Cloudinary.
 * @param {string} url - URL lengkap dari Cloudinary.
 * @returns {string|null} public_id atau null jika tidak valid.
 */
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  // Regex untuk menemukan bagian setelah /v<nomor>/ dan sebelum ekstensi file
  const regex = /\/v\d+\/(.+?)(?:\.\w+)?$/;
  const match = url.match(regex);
  // match[1] akan berisi public_id yang kita inginkan
  return match ? match[1] : null;
};

/**
 * @desc    Membuat aplikasi pendaftaran seller baru (Metode Manual Cloudinary)
 * @route   POST /api/client/apply
 * @access  Private
 */
export const applySellerApplication = async (req, res) => {
  const userId = req.user._id;

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

    // Ambil data dari request body
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

    const uploadFolder = "seller-applications";
    let documentUploadPromises = [];

    if (location === "ID") {
      documentUploadPromises.push(
        uploadToCloudinary(docBase64.ktp, uploadFolder)
      );
      documentUploadPromises.push(
        uploadToCloudinary(docBase64.npwp, uploadFolder)
      );
    } else {
      documentUploadPromises.push(
        uploadToCloudinary(docBase64.passport, uploadFolder)
      );
      documentUploadPromises.push(
        uploadToCloudinary(docBase64.businessLicense, uploadFolder)
      );
    }

    const uploadedResults = await Promise.all(documentUploadPromises);

    // Susun objek dokumen dari hasil unggahan
    const uploadedDocuments = {};
    if (location === "ID") {
      uploadedDocuments.ktp = uploadedResults[0];
      uploadedDocuments.npwp = uploadedResults[1];
    } else {
      uploadedDocuments.passport = uploadedResults[0];
      uploadedDocuments.businessLicense = uploadedResults[1];
    }

    const { fullName, email } = req.user;
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

    await newApplication.save();

    res.status(201).json({
      message: "Seller application created successfully.",
      application: newApplication,
    });
  } catch (error) {
    console.error("SERVER_ERROR in applySellerApplication:", error);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @desc Admin memperbarui status aplikasi seller (Approved/Rejected)
 * @route PUT /api/company/seller-applications/:id/status
 * @access Private/Admin
 */
export const updateApplicationStatus = async (req, res) => {
  const { status, rejectionReason } = req.body;
  const { id: applicationId } = req.params;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Must be 'approved' or 'rejected'.",
    });
  }

  if (
    status === "rejected" &&
    (!rejectionReason || rejectionReason.trim() === "")
  ) {
    return res.status(400).json({
      message: "Rejection reason is required when status is 'rejected'.",
    });
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const application = await SellerApplication.findById(applicationId).session(
      session
    );

    if (!application) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    if (application.status !== "pending") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: `Application is already ${application.status}.`,
      });
    }

    application.status = status;

    if (status === "rejected") {
      application.rejectionReason = rejectionReason;
    } else if (status === "approved") {
      application.rejectionReason = undefined;

      const rejectedApplications = await SellerApplication.find({
        userId: application.userId,
        status: "rejected",
      }).session(session);

      const publicIdsToDelete = rejectedApplications.flatMap((app) =>
        Object.values(app.documents)
          .filter((url) => typeof url === "string")
          .map((url) => getPublicIdFromUrl(url))
          .filter((id) => id)
      );

      if (publicIdsToDelete.length > 0) {
        await cloudinary.api.delete_resources(publicIdsToDelete);
      }

      await User.findByIdAndUpdate(
        application.userId,
        { role: "seller" },
        { session }
      );

      const store = new Store({
        ownerId: application.userId,
        name: application.storeName,
        description: application.storeDescription,
        categories: application.categories,
        location: application.location,
        address: application.address,
      });

      await store.save({ session });

      await SellerApplication.deleteMany(
        {
          userId: application.userId,
          status: "rejected",
        },
        { session }
      );
    }

    const updatedApplication = await application.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Kirim Notifikasi & email setelah transaks berhasil
    const user = await User.findById(application.userId).select("email");
    const userEmail = user.email;
    const io = req.app.get("socketio");

    if (status === "approved") {
      await sendNotification(io, "approved", application, userEmail);
    } else if (status === "rejected") {
      await sendNotification(
        io,
        "rejected",
        application,
        userEmail,
        rejectionReason
      );
    }

    res.status(200).json({
      message: "Application status updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();

    console.error("🔥 SERVER_ERROR in updateApplicationStatus:", error);
    // Perbaikan: Selalu kirim respons error ke klien
    res.status(500).json({ message: "An unexpected server error occurred." });
  }
};

/**
 * Helper function untuk mengirim notifikasi dan email agar controller utama lebih bersih.
 * @param {'approved' | 'rejected'} type - Tipe notifikasi
 * @param {object} application - Objek aplikasi
 * @param {string} userEmail - Email pengguna
 * @param {string} [rejectionReason] - Alasan penolakan (opsional)
 */
const sendNotification = async (
  io,
  type,
  application,
  userEmail,
  rejectionReason = ""
) => {
  const commonDetails = {
    userId: application.userId,
    type: "store",
    detailContent: {
      cta: {
        text: "View Store",
        link: "/store/dashboard",
      },
    },
  };

  if (type === "approved") {
    await Notification.create({
      ...commonDetails,
      title: "Applicaiton Seller Approved",
      description:
        "Congratulations! Your seller application has been approved.",
      detailContent: {
        ...commonDetails.detailContent,
        header: "Application Approved",
        body: `Congratulations! Your seller application has been approved. You can now start selling your products on our platform.`,
      },
    }).then((notif) =>
      sendNotificationToUser(io, application.userId.toString(), notif)
    );

    await sendStatusUpdateEmail(
      userEmail,
      "Application Seller Approved",
      `<h1>Congratulations!</h1><p>Your application to open the store "${application.storeName}" has been approved.</p>`
    );
  } else {
    await Notification.create({
      ...commonDetails,
      title: "Application Seller Rejected",
      description: `We're sorry, your application for store "${application.storeName}" was rejected.`,
      detailContent: {
        header: "Application Rejected",
        body: `Rejected Reason: ${rejectionReason}`,
      },
    }).then((notif) =>
      sendNotificationToUser(io, application.userId.toString(), notif)
    );

    await sendStatusUpdateEmail(
      userEmail,
      "Application Seller Rejected",
      `<h1>Application Update</h1><p>Your application for the store "${application.storeName}" has been rejected. <b>Reason:</b> ${rejectionReason}</p>`
    );
  }
};

/**
 * @desc Admin mendapatkan seluruh daftar aplikasi seller (bisa difilter by status)
 * @route GET /api/company/seller-applications
 * @access Private/Admin
 */
export const getAllSellerApplications = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const applications = await SellerApplication.find(filter)
      .populate("userId", "fullName email phone status")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @desc User mendapatkan detail aplikasi seller mereka
 * @route GET /api/seller-applications/my-application
 * @access Private/User
 */
export const getMyApplication = async (req, res) => {
  try {
    const application = await SellerApplication.findOne({
      userId: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        message: "No application found for this user.",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
      stack: error.stack,
    });
  }
};
