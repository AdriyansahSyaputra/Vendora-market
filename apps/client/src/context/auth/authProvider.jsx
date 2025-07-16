import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const register = async (userData) => {
    try {
      const { data } = await axios.post("/api/auth/register", userData);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error.response?.data || error;
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error.response;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error.response?.data || error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
