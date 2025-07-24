export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed. Please check the details.",
        details: error.issues,
      });
    }

    // Jika error lain, kirim sebagai error server
    return res.status(500).json({
      message: "An unexpected error occurred.",
    });
  }
};
