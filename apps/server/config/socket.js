import { Server } from "socket.io";

const userSocketMap = {};

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with id: ${socket.id}`);

    socket.on("registerUser", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log("User registered with id:", userId, "socket id:", socket.id);
    });

    socket.on("disconnect", () => {
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      console.log("User disconnected with id:", userId);
    });
  });

  return io;
};

export const sendNotificationToUser = (io, userId, data) => {
  const socketId = userSocketMap[userId];
  if (socketId) {
    io.to(socketId).emit("notification", data);
    console.log(
      "Notification sent to user with id:",
      userId,
      "socket id:",
      socketId
    );
  }
};
