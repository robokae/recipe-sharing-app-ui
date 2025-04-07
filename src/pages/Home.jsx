import {
  Box,
  Card,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { useEffect, useState } from "react";
import DesktopNavBar from "../components/DesktopNavBar";

function Home() {
  const { data, isLoading, error, callApi } = useApi();
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await callApi("/api/recipes", "GET");
      if (response) {
        setRecipes(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <DesktopNavBar />
      <Center>
        <Box width={["md", "xl"]} mt="16" padding="4">
          <Heading fontSize="3xl" textAlign="center" mb="8">
            Explore Recipes
          </Heading>
          <Box display="flex" flexDirection="column" gap="8">
            {recipes &&
              recipes.map((recipe, index) => (
                <Card.Root key={index}>
                  <Card.Header>
                    <Card.Title>{recipe.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Text>{recipe.description}</Text>
                  </Card.Body>
                  <Card.Footer>
                    <Flex gap="4">
                      <Text color="gray.500">{`Completion time: ${recipe.completionTimeInMinutes} min`}</Text>
                      <Text color="gray.500">{`Servings: ${recipe.numServings}`}</Text>
                    </Flex>
                  </Card.Footer>
                </Card.Root>
              ))}
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

export default Home;
