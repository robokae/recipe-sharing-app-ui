import { Heading, Stack, StackSeparator } from "@chakra-ui/react";
import RecipeFeedItem from "./RecipeFeedItem";
import { useAuth } from "../../context/AuthProvider";
import { useSaveRecipe } from "../../hooks/useSaveRecipe";

function RecipeFeed({ data, title }) {
  const { user } = useAuth();
  const { savedRecipes, handleSave } = useSaveRecipe(user?.username);

  const handleLike = (recipeId) => {};

  return (
    <Stack
      marginLeft={["0", "0", "48"]}
      paddingX={["0", "0", "8"]}
      paddingY="8"
    >
      <Heading padding="4" paddingTop="0" marginBottom="4" size="2xl">
        {title}
      </Heading>
      <Stack
        width={["full", "full", "full", "2/3"]}
        gap="8"
        separator={<StackSeparator />}
      >
        {data.map((recipe, index) => (
          <RecipeFeedItem
            data={recipe}
            key={index}
            user={user}
            handleSave={handleSave}
            handleLike={handleLike}
            isSaved={savedRecipes.some(
              (savedRecipe) => savedRecipe.id === recipe.id
            )}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default RecipeFeed;
