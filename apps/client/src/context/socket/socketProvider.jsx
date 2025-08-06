import { useState, useEffect, useRef } from "react";
import { SocketContext } from "./socketContext";
import { useAuth } from "../auth/authContext";
import { io } from "socket.io-client";

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const userIdRef = useRef(null);

  useEffect(() => {
    if (user && user._id) {
      if (userIdRef.current !== user._id) {
        if (socketRef.current) {
          console.log("Closing previous socket connection");
          socketRef.current.close();
        }

        // Buat koneksi socket baru
        console.log("Creating new socket connection for user:", user._id);
        const newSocket = io("http://localhost:3000", {
          withCredentials: true,
          transports: ["websocket", "polling"],
          timeout: 20000,
          forceNew: true,
        });

        // Simpan referensi socket dan user ID
        socketRef.current = newSocket;
        userIdRef.current = user._id;

        // Event listeners
        newSocket.on("connect", () => {
          console.log("Socket connected:", newSocket.id);
          newSocket.emit("registerUser", user._id);
        });

        newSocket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
        });

        newSocket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
        });

        setSocket(newSocket);
      }
    } else {
      if (socketRef.current) {
        console.log("User logged out, closing socket connection");
        socketRef.current.close();
        socketRef.current = null;
        userIdRef.current = null;
        setSocket(null);
      }
    }

    return () => {
      if (socketRef.current) {
        console.log("Component unmounting, cleaning up socket");
        socketRef.current.close();
      }
    };
  }, [user]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log("SocketProvider unmounting, closing connection");
        socketRef.current.close();
      }
    };
  }, []);

  const contextValue = {
    socket: socket,
    isConnected: socket?.connected || false,
    userId: userIdRef.current,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
