export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.name === "ZodError") {
      // Format error untuk dikonsumsi oleh react-hook-form
      const formattedErrors = {};
      error.issues.forEach((issue) => {
        const field = issue.path.join(".");
        formattedErrors[field] = issue.message;
      });

      return res.status(400).json({
        message: "Validation failed",
        type: "validation",
        errors: formattedErrors,
        details: error.issues,
      });
    }

    // Jika error lain, kirim sebagai error server
    return res.status(500).json({
      message: "An unexpected error occurred.",
    });
  }
};
