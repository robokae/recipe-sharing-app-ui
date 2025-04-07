import axios from "axios";
import { useState } from "react";
import { useToken } from "./useToken";

export const useApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useToken();

  const callApi = async (url, method, payload) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      let response;
      if (method === "GET") {
        response = await axios.get(url);
      } else if (method === "POST") {
        response = await axios.post(url, JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      }
      setData(response.data);
      return response;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, callApi };
};
