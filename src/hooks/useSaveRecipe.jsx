import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useApi } from "./useApi";
import { useNavigate } from "react-router-dom";

export const useSaveRecipe = (username) => {
  const { user } = useAuth();
  const { callApi } = useApi();
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchSavedRecipes = async (username) => {
        await callApi(`/api/recipes/saved/${username}`, "GET").then((res) => {
          setSavedRecipes(res.data);
        });
      };

      fetchSavedRecipes(username);
    }
  }, []);

  const handleSave = async (recipe) => {
    if (!user) {
      navigate("/login");
    }

    savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id)
      ? await unsaveRecipe(recipe.id)
      : await saveRecipe(recipe);
  };

  const saveRecipe = async (recipe) => {
    const request = {
      action: "SAVE",
      recipeId: recipe.id,
      username: user.username,
    };

    await callApi("/api/recipe", "POST", request).then((res) => {
      if (res.status === 204) {
        const updatedSave = [...savedRecipes, recipe];
        setSavedRecipes(updatedSave);
      }
    });
  };

  const unsaveRecipe = async (recipeId) => {
    await callApi(
      `/api/recipe/${recipeId}/user/${user.username}`,
      "DELETE"
    ).then((res) => {
      if (res.status === 204) {
        const updatedSave = savedRecipes.filter(
          (recipe) => recipe.id !== recipeId
        );
        setSavedRecipes(updatedSave);
      }
    });
  };

  return { savedRecipes, handleSave };
};
