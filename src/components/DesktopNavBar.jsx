import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function DesktopNavBar() {
  const navigate = useNavigate();

  return (
    <Box
      width="full"
      borderBottom="1px solid"
      borderColor="gray.800"
      padding="4"
    >
      <Flex direction="row" justifyContent="space-around" alignItems="center">
        <Link to="/">
          <Heading size="md">RecipeDB</Heading>
        </Link>
        <Button onClick={() => navigate("/recipe/new")}>New Recipe</Button>
      </Flex>
    </Box>
  );
}

export default DesktopNavBar;
