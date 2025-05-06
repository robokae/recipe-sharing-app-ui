import { createContext, useContext, useState } from "react";
import { useToken } from "../hooks/useToken";
import { useApi } from "../hooks/useApi";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userDetails = localStorage.getItem("user");
    return userDetails ? JSON.parse(userDetails) : null;
  });
  const { token, setToken } = useToken();
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginRequest) => {
    setIsLoading(true);
    token && setToken(null);

    const response = await callApi("/api/login", "POST", loginRequest);

    if (response?.error) {
      setIsLoading(false);
      throw new Error(
        response.error.response?.data || "An unexpected error occurred"
      );
    } else if (response.status === 200) {
      const token = response.headers.authorization;
      const userDetails = response.data;

      localStorage.setItem("user", JSON.stringify(userDetails));
      setUser(userDetails);
      setToken(token);
      setIsLoading(false);
      return true;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("savedRecipes");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
