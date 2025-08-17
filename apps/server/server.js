import app from "./app.js";
import mongoose from "./config/db.js";
import dotenv from "dotenv";
import http from "http";
import { initializeSocket } from "./config/socket.js";
import { startVoucherScheduler } from "./services/voucherScheduler.js";
dotenv.config();

const server = http.createServer(app);

const io = initializeSocket(server);

app.set("socketio", io);

startVoucherScheduler();

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
