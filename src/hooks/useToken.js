import { useState } from "react";

export const useToken = () => {
  const TOKEN = "token";

  const getToken = () => {
    try {
      const authToken = sessionStorage.getItem(TOKEN);
      return JSON.parse(authToken);
    } catch (e) {
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (authToken) => {
    sessionStorage.setItem(TOKEN, JSON.stringify(authToken));
    setToken(authToken);
  };

  return { token, setToken: saveToken };
};
