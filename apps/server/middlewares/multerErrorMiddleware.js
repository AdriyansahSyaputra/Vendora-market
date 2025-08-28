import { MulterError } from "multer";

export const handleMulterError = (err, req, res, next) => {
  // Cek apakah error berasal dari Multer
  if (err instanceof MulterError) {
    let errorMessage = "An error occurred during file upload.";
    if (err.code === "LIMIT_FILE_SIZE") {
      const maxSize = req.uploadConfig
        ? req.uploadConfig.maxSizeMB
        : "the allowed";
      errorMessage = `File is too large. Maximum size is ${maxSize}MB.`;
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      errorMessage = "Invalid file format. Please upload a valid image.";
    }

    return res.status(400).json({
      message: "Validation failed. Please check the details.",
      errors: {
        image: errorMessage,
      },
    });
  }

  next(err);
};
