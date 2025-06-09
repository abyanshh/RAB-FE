import { createContext, useEffect, useState } from "react";
import { refreshToken, logout as logoutService } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../services/user";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState("");

  const fetchUser = async () => {
    try {
      const accessToken = await refreshToken();
      setToken(accessToken);
      const decoded = jwtDecode(accessToken);
      setRole(decoded.role);
      const userData = await getUserById(decoded.id, accessToken);
      setUser(userData);
    } catch (err) {
      console.error("Auth error:", err);
      setUser(null);
      setRole(null);
      setToken("");
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setRole(null);
    setToken("");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, token, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
