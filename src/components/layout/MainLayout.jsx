import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container, Flex } from "@chakra-ui/react";

function MainLayout() {
  return (
    <Flex flexDirection="column">
      <NavBar />
      <Container mt="32">
        <Outlet />
      </Container>
    </Flex>
  );
}

export default MainLayout;
