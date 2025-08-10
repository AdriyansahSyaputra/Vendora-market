// middleware/parseFormData.js

/**
 * Middleware untuk mem-parsing field tertentu dari req.body yang
 * dikirim sebagai string JSON dari FormData.
 * @param {string[]} fieldsToParse - Array nama field yang akan di-parse.
 */
export const parseJsonFields = (fieldsToParse) => (req, res, next) => {
  if (req.body) {
    fieldsToParse.forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          return res
            .status(400)
            .json({ message: `Invalid JSON format for field: ${field}` });
        }
      }
    });
  }
  next();
};
