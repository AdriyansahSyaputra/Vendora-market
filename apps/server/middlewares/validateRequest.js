export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    // Periksa apakah error berasal dari Zod
    if (error.name === "ZodError") {
      // Kirim kembali JSON dengan properti 'details' yang berisi error.issues
      // agar cocok dengan apa yang diharapkan oleh frontend.
      return res.status(400).json({
        message: "Validation failed. Please check the details.",
        details: error.issues, // Ganti 'errors: error.errors' menjadi 'details: error.issues'
      });
    }

    // Jika error lain, kirim sebagai error server
    return res.status(500).json({
      message: "An unexpected error occurred.",
    });
  }
};
