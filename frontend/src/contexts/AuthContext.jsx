import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin, register as authRegister } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authLogin(username, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const userData = await authRegister(username, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
