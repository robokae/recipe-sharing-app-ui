import { useEffect, useState } from "react";
import { useApi } from "./useApi";

export const useFetchRecipe = () => {
  const { callApi } = useApi();
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await callApi("/api/recipes", "GET");
      if (response) {
        setRecipes(response.data);
      }
    };
    fetchData();
  }, [callApi]);

  return { recipes };
};
