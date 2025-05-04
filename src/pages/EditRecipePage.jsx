import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import RecipeForm from "../components/form/RecipeForm";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

function EditRecipePage() {
  const { id } = useParams();
  const { data } = useFetchRecipe(id, null);

  return (
    <Flex width={["full", "full", "3/4"]} mt="8">
      <Box flex="1">
        <Heading fontSize="3xl" mb="16">
          Edit recipe
        </Heading>
        <RecipeForm id={id} initialValues={data} />
      </Box>
    </Flex>
  );
}

export default EditRecipePage;
