import axios from "axios";
import { useToken } from "./useToken";

export const useApi = () => {
  const { token } = useToken();

  const callApi = async (url, method, payload, options) => {
    try {
      let response;
      if (method === "GET" || method === "DELETE") {
        response = await axios.request({
          method: method,
          url: url,
        });
      } else if (method === "POST" || method === "PATCH") {
        const contentType = options?.contentType ?? "application/json";

        const requestBody =
          contentType === "multipart/form-data"
            ? payload
            : JSON.stringify(payload);

        const headers = {
          "Content-Type": contentType,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        response = await axios.request({
          method: method,
          url: url,
          data: requestBody,
          headers: headers,
        });
      }

      return response;
    } catch (error) {
      return { error: error.response.data || "An unexpected error occurred" };
    }
  };

  return { callApi };
};
