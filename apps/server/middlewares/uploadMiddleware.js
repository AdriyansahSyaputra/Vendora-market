import multer from "multer";

const DEFAULT_IMAGE_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

/**
 * Membuat middleware Multer yang dapat dikonfigurasi untuk menangani upload file.
 * @param {object} options - Opsi konfigurasi.
 * @param {string} options.fieldName - Nama field input file di form (e.g., 'images', 'avatar').
 * @param {number} options.maxCount - Jumlah maksimal file yang diizinkan.
 * @param {number} options.maxSizeMB - Ukuran maksimal per file dalam Megabytes (MB).
 * @param {string[]} [options.allowedFormats] - Array format MIME yang diizinkan. Default ke format gambar umum.
 * @returns {Function} Middleware Multer yang siap digunakan.
 */
export const createUploadMiddleware = ({
  fieldName,
  maxCount,
  maxSizeMB,
  allowedFormats = DEFAULT_IMAGE_FORMATS,
}) => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true); // Terima file
    } else {
      const allowedTypesString = allowedFormats
        .map((type) => type.split("/")[1])
        .join(", ")
        .toUpperCase();
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          `Invalid file format. Only ${allowedTypesString} are allowed.`
        ),
        false
      );
    }
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: maxSizeMB * 1024 * 1024,
    },
    fileFilter,
  });

  // Mengembalikan middleware yang sesuai, single() atau array()
  if (maxCount === 1) {
    return upload.single(fieldName);
  }
  return upload.array(fieldName, maxCount);
};

/**
 * Membuat middleware untuk memvalidasi jumlah minimal file.
 * Cerdas untuk menangani skenario CREATE (hanya file baru)
 * dan UPDATE (file baru + URL lama).
 * @param {object} options - Opsi konfigurasi.
 * @param {string} options.fieldName - Nama field di form (e.g., 'images'). WAJIB.
 * @param {number} options.minCount - Jumlah minimal file.
 * @param {string} [options.message] - Pesan error kustom.
 * @returns {Function} Middleware validasi.
 */
export const validateFileCount = ({ fieldName, minCount, message }) => {
  return (req, res, next) => {
    const newFiles = req.files || (req.file ? [req.file] : []);

    // 2. Ambil URL file lama dari body
    let existingImageUrls = [];
    if (req.body[fieldName]) {
      const existing = Array.isArray(req.body[fieldName])
        ? req.body[fieldName]
        : [req.body[fieldName]];
      // Pastikan hanya menghitung string (URL), bukan objek File
      existingImageUrls = existing.filter((item) => typeof item === "string");
    }

    // 3. Hitung totalnya
    const totalCount = newFiles.length + existingImageUrls.length;

    if (totalCount < minCount) {
      return res.status(400).json({
        message: "Validation failed. Please check the details.",
        errors: {
          [fieldName]: message || `At least ${minCount} file(s) are required.`,
        },
      });
    }
    next();
  };
};
