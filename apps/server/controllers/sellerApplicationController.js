import SellerApplication from "../models/sellerApplicationsModel.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Store from "../models/storeModel.js";
import { sendNotificationToUser } from "../config/socket.js";
import { sendStatusUpdateEmail } from "../services/emailService.js";
import Notification from "../models/notificationsModel.js";

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
 * @desc    Membuat aplikasi pendaftaran seller baru (Metode Manual Cloudinary)
 * @route   POST /api/seller-applications/apply
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
      error: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @desc Admin memperbarui status aplikasi seller (Approved/Rejected)
 * @route PUT /api/seller-applications/:id/status
 * @access Private/Admin
 */
export const updateApplicationStatus = async (req, res) => {
  const { status, rejectionReason } = req.body;
  const { id: applicationId } = req.params;

  try {
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

    const application = await SellerApplication.findById(
      applicationId
    ).populate("userId", "email");

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        message: `Application is already ${application.status}.`,
      });
    }

    application.status = status;

    if (status === "rejected") {
      application.rejectionReason = rejectionReason;
    } else {
      application.rejectionReason = undefined;
    }

    if (status === "approved") {
      await User.findByIdAndUpdate(application.userId, { role: "seller" });

      const store = new Store({
        ownerId: application.userId,
        name: application.storeName,
        description: application.storeDescription,
        categories: application.categories,
        location: application.location,
        address: application.address,
      });

      await store.save();
    }

    const updatedApplication = await application.save();

    // Fungsi untuk membuat & mengirim notifikasi
    const createAndSendNotification = async (
      type,
      title,
      description,
      header,
      body,
      cta = ""
    ) => {
      const newNotification = await Notification.create({
        userId: application.userId,
        type,
        title,
        description,
        detailContent: {
          header,
          body,
          cta: {
            text: "View Application Status",
            link: "",
          },
        },
      });

      const io = req.app.get("socketio");
      sendNotificationToUser(
        io,
        application.userId._id.toString(),
        newNotification
      );
    };

    // Panggil fungsi notifikasi
    if (status === "approved") {
      await createAndSendNotification(
        "store",
        "Application Seller Approved",
        "Congratulations! Your seller application has been approved.",
        "Application Approved",
        `Your application has been approved. You can now create your store with the name "${application.storeName}" and start selling products.`,
        ""
      );

      await sendStatusUpdateEmail(
        application.userId.email,
        "Application Seller Approved",
        `<h1>Congratulations!</h1><p>Your application to open the store "${application.storeName}" has been approved.</p>`
      );
    } else if (status === "rejected") {
      await createAndSendNotification(
        "store",
        "Application Seller Rejected",
        `We're sorry to inform you that your application to open the store "${application.storeName}" has been rejected.`,
        "Application Rejected",
        `Reason: ${rejectionReason}`,
        ""
      );

      await sendStatusUpdateEmail(
        application.userId.email,
        "Application Seller Rejected",
        `<h1>Application Update</h1><p>Your application for the store "${application.storeName}" has been rejected. <b>Reason:</b> ${rejectionReason}</p>`
      );
    }

    res.status(200).json({
      message: `Application status updated to ${status}.`,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
  }
};

/**
 * @desc Admin mendapatkan seluruh daftar aplikasi seller (bisa difilter by status)
 * @route GET /api/seller-applications
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
