import app from "./app.js";
import mongoose from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
