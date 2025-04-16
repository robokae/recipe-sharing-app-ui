import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function DesktopNavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      backgroundColor="black"
      borderBottom="1px solid"
      borderColor="gray.800"
      padding="4"
    >
      <Flex direction="row" justifyContent="space-around" alignItems="center">
        <Link to="/">
          <Heading size="md">RecipeDB</Heading>
        </Link>
        <ButtonGroup>
          {user ? (
            <Button onClick={handleSignout}>Sign out</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Sign in</Button>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default DesktopNavBar;
