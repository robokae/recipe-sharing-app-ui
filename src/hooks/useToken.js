import { useState } from "react";

export const useToken = () => {
  const TOKEN = "token";

  const getToken = () => {
    const authToken = localStorage.getItem(TOKEN);
    return authToken ? JSON.parse(authToken) : null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (authToken) => {
    localStorage.setItem(TOKEN, JSON.stringify(authToken));
    setToken(authToken);
  };

  return { token, setToken: saveToken };
};
