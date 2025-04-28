import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider";
import SideMenu from "../components/layout/SideMenu";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

function Home() {
  const { user } = useAuth();
  const { recipes } = useFetchRecipe();

  return (
    <Flex width="full" flexDirection="row" gap="8">
      <SideMenu />
      <Box flex="1" width={["md", "xl"]}>
        <Heading fontSize="3xl" mb="8">
          {user ? `Hello ${user.firstName}!` : "Explore Recipes"}
        </Heading>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={("2", "2", "4")}
        >
          {recipes &&
            recipes.map((recipe, index) => (
              <GridItem key={index} height="full">
                <Card.Root height="full">
                  <Card.Header>
                    <Card.Title>{recipe.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Text>{recipe.description}</Text>
                  </Card.Body>
                </Card.Root>
              </GridItem>
            ))}
        </Grid>
      </Box>
    </Flex>
  );
}

export default Home;
