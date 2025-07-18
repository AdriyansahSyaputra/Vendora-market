import { useEffect, useState, useMemo, useCallback } from "react";
import { AuthContext } from "./authContext.js";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fungsi-fungsi di-memoize dengan useCallback untuk stabilitas
  const login = useCallback(async (credentials) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      setUser(data.user);
      return data; // Return data agar bisa di-handle oleh komponen (untuk redirect)
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const { data } = await axios.post("/api/auth/register", userData);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registrasi failed");
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  }, []);

  // Gunakan useMemo untuk mencegah re-render yang tidak perlu pada consumer context
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
