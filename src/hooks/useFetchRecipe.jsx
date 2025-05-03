import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { useFetchFeaturedImage } from "./useFetchFeaturedImage";

export const useFetchRecipe = (id) => {
  const { callApi } = useApi();
  const [data, setData] = useState([]);
  const { fetchImage } = useFetchFeaturedImage();

  useEffect(() => {
    const url = id ? `/api/recipe/${id}` : "/api/recipes";

    const fetchData = async () => {
      const response = await callApi(url, "GET");

      if (response) {
        let result = response.data;

        if (id) {
          if (result.featuredImageId) {
            result.featuredImage = await fetchImage(result.featuredImageId);
          }
        } else {
          for (const recipe of result) {
            if (recipe.featuredImageId) {
              recipe.featuredImage = await fetchImage(recipe.featuredImageId);
            }
          }
        }

        setData(result);
      }
    };
    fetchData();
  }, [id]);

  return { data };
};
