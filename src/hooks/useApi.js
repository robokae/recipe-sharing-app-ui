import axios from "axios";
import { useToken } from "./useToken";

export const useApi = () => {
  const { token } = useToken();

  const callApi = async (url, method, payload) => {
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
      return response;
    } catch (error) {
      return { error: error || "An unexpected error occurred" };
    }
  };

  return { callApi };
};
