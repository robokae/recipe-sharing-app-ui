import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignout = () => {
    logout();
    navigate("/");
  };

  return (
    <Flex
      position="fixed"
      width="100%"
      backgroundColor="black"
      borderBottom="1px solid"
      borderColor="gray.800"
      pt="4"
      pb="4"
    >
      <Container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
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
      </Container>
    </Flex>
  );
}

export default NavBar;
