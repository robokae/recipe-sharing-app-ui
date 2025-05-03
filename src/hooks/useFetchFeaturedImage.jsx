import { useApi } from "./useApi";

export const useFetchFeaturedImage = () => {
  const { callApi } = useApi();

  const fetchImage = async (id) => {
    const response = await callApi(`/api/featuredImage/${id}`, "GET");
    const image = `data:image/jpeg;base64,${response.data}`;
    return image;
  };

  return { fetchImage };
};
