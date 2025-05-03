import { Button, Card, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SignoutSuccess() {
  return (
    <Center padding="4" mt="16">
      <Card.Root
        width="md"
        borderWidth={["0", "1px"]}
        background={["transparent", "gray.950"]}
      >
        <Card.Header>
          <Card.Title fontSize="2xl" textAlign="center">
            Signed out
          </Card.Title>
        </Card.Header>
        <Card.Body gap="8">
          <Card.Description textAlign="center">
            You are now logged out. Thanks for visiting!
          </Card.Description>
          <Link to="/">
            <Button width="full">Home</Button>
          </Link>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}

export default SignoutSuccess;
