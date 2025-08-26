import cloudinary from "../config/cloudinaryConfig.js";

/**
 * Mengunggah satu atau beberapa file ke Cloudinary secara aman.
 * Fungsi ini secara cerdas menangani input berupa satu objek file atau array objek file.
 *
 * @param {object|object[]} filesOrFile - Satu objek file (dari req.file) atau array objek file (dari req.files).
 * @param {string} folder - Nama folder di Cloudinary tempat menyimpan file.
 * @returns {Promise<string[]>} Sebuah promise yang menghasilkan array berisi URL aman dari file yang diunggah.
 */
export const uploadFilesToCloudinary = async (filesOrFile, folder) => {
  if (!filesOrFile) return [];

  const filesToUpload = Array.isArray(filesOrFile)
    ? filesOrFile
    : [filesOrFile];
  if (filesToUpload.length === 0) return [];

  const uploadPromises = filesToUpload.map((file) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.buffer) {
        return reject(new Error("File or file buffer is missing."));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, result) => {
          if (error) {
            console.error("Cloudinary API Error:", error);
            return reject(
              new Error(`Cloudinary upload failed: ${error.message}`)
            );
          }
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Cloudinary upload result is undefined."));
          }
        }
      );
      uploadStream.end(file.buffer);
    });
  });

  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("A promise failed during Cloudinary upload:", error);
    throw new Error(error.message || "Failed to upload files to Cloudinary.");
  }
};

/**
 * Menghapus satu atau beberapa gambar dari Cloudinary berdasarkan URL-nya.
 * @param {string|string[]} imageUrls - Satu URL atau array URL gambar yang akan dihapus.
 */
export const deleteFilesFromCloudinary = async (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return;

  const urlsToDelete = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

  const publicIds = urlsToDelete
    .map((url) => {
      try {
        const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/;
        const match = url.match(regex);
        return match ? match[1] : null;
      } catch (e) {
        console.error(
          `Invalid Cloudinary URL, cannot extract public_id: ${url}`
        );
        return null;
      }
    })
    .filter(Boolean);

  if (publicIds.length === 0) return;

  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
  }
};
