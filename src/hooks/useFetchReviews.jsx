import { useEffect } from "react";
import { useApi } from "./useApi";
import { useState } from "react";

export const useFetchReviews = (recipeId) => {
  const { callApi } = useApi();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await callApi(`/api/reviews/${recipeId}`, "GET");
      if (response) {
        setReviews(response.data);
      }
    };

    fetchReviews();
  }, [recipeId]);

  return { reviews };
};
