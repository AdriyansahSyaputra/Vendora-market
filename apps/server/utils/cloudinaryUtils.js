import cloudinary from "../config/cloudinaryConfig.js";

/**
 * Meng-upload array file (dari multer) ke Cloudinary.
 * Fungsi ini dirancang untuk menjadi generik dan dapat digunakan kembali.
 * @param {Array<object>} files - Array file dari `req.files` (disediakan oleh multer).
 * @param {string} folder - Nama folder di Cloudinary untuk menyimpan gambar (e.g., 'products/store123', 'avatars/users').
 * @returns {Promise<Array<string>>} Array URL dari gambar yang di-upload.
 */
export const uploadFilesToCloudinary = async (files, folder) => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      // Menggunakan 'upload_stream' untuk meng-upload buffer secara langsung
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.secure_url);
        }
      );
      // Mengirim buffer file ke stream
      uploadStream.end(file.buffer);
    });
  });

  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Failed to upload images to Cloudinary.");
  }
};

/**
 * Menghapus beberapa gambar dari Cloudinary berdasarkan URL-nya.
 * @param {Array<string>} imageUrls - Array URL gambar yang akan dihapus.
 */
export const deleteFilesFromCloudinary = async (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return;

  // Ekstrak public_id dari setiap URL
  const publicIds = imageUrls
    .map((url) => {
      try {
        // Pola ini lebih kuat untuk mengekstrak public_id
        const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/;
        const match = url.match(regex);
        return match ? match[1] : null;
      } catch (e) {
        console.error(`Invalid Cloudinary URL: ${url}`);
        return null;
      }
    })
    .filter(Boolean); // Hapus nilai null dari array

  if (publicIds.length === 0) return;

  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    // Jangan melempar error di sini agar proses update bisa lanjut
    // Cukup log error-nya
  }
};
