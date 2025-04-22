import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import AccountMenu from "../AccountMenu";

function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Flex
      position="fixed"
      width="100%"
      backgroundColor="black"
      borderBottom="1px solid"
      borderColor="gray.800"
      pt="4"
      pb="4"
      zIndex="overlay"
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
        {user ? (
          <AccountMenu user={user} logout={logout} />
        ) : (
          <Button onClick={() => navigate("/login")}>Sign in</Button>
        )}
      </Container>
    </Flex>
  );
}

export default NavBar;
