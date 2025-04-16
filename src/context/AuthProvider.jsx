import { createContext, useContext, useState } from "react";
import { useToken } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userDetails = localStorage.getItem("user");
    return userDetails ? JSON.parse(userDetails) : null;
  });
  const { setToken } = useToken();

  const login = (userDetails, authToken) => {
    localStorage.setItem("user", JSON.stringify(userDetails));
    setUser(userDetails);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
