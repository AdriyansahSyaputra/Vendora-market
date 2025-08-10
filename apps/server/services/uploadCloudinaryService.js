/**
 * Fungsi helper untuk mengunggah satu file Base64 ke Cloudinary
 * @param {string} fileString - String Base64 dari file
 * @param {string} folder - Nama folder di Cloudinary
 * @returns {Promise<string>} URL file yang aman dari Cloudinary
 */
export const uploadToCloudinary = async (fileString, folder) => {
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
