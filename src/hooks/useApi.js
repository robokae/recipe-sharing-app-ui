import axios from "axios";
import { useToken } from "./useToken";

export const useApi = () => {
  const { token } = useToken();

  const callApi = async (url, method, payload, options) => {
    try {
      let response;
      if (method === "GET") {
        response = await axios.get(url);
      } else if (method === "POST") {
        const contentType = options?.contentType ?? "application/json";
        const requestBody =
          contentType === "multipart/form-data"
            ? payload
            : JSON.stringify(payload);
        response = await axios.post(url, requestBody, {
          headers: {
            "Content-Type": contentType,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      }
      return response;
    } catch (error) {
      return { error: error.response.data || "An unexpected error occurred" };
    }
  };

  return { callApi };
};
