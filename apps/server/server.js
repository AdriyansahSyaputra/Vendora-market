import app from "./app.js";
import mongoose from "./config/db.js";
import dotenv from "dotenv";
import http from "http";
import { initializeSocket } from "./config/socket.js";

const server = http.createServer(app);

const io = initializeSocket(server);

app.set("socketio", io);

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
