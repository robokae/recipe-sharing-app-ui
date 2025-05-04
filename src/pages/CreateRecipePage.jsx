import { Box, Flex, Heading } from "@chakra-ui/react";
import RecipeForm from "../components/form/RecipeForm";

function CreateRecipePage() {
  return (
    <Flex width={["full", "full", "3/4"]} mt="8">
      <Box flex="1">
        <Heading fontSize="3xl" mb="16">
          Create a new recipe
        </Heading>
        <RecipeForm />
      </Box>
    </Flex>
  );
}

export default CreateRecipePage;
