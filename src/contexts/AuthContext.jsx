import { createContext, useEffect, useState } from "react";
import { refreshToken, logout as logoutService } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await refreshToken();
      if (accessToken) setToken(accessToken);
    };
    fetchToken();
  }, []);

  const logout = async () => {
    try {
      await logoutService();
      setToken("");
    } catch (error) {
      console.error("Logout gagal:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
