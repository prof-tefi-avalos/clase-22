import { createContext, useContext, useState, useEffect } from "react";
import API, { setAuthToken } from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      // opcional: podríamos decodificar para setear user
      API.get("/auth/me").catch(() => {
        // noop si no existe endpoint /auth/me
      });
      setUser({}); // placeholder si quieres info real la pedimos al backend
    } else {
      setAuthToken(null);
      setUser(null);
    }
  }, [token]);

  const register = async ({ email, password, name }) => {
    const res = await API.post("/auth/register", { email, password, name });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = { user, token, register, login, logout, isLogged: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
