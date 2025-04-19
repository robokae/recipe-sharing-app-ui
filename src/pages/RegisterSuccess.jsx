import { Button, Card, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <Center padding="4" mt="16">
      <Card.Root
        width="md"
        borderWidth={["0", "1px"]}
        background={["transparent", "gray.950"]}
      >
        <Card.Header>
          <Card.Title fontSize="2xl" textAlign="center">
            Success!
          </Card.Title>
        </Card.Header>
        <Card.Body gap="8">
          <Card.Description textAlign="center">
            Your RecipeDB account has been created. You can now sign in and
            start sharing recipes.
          </Card.Description>
          <Button width="full" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}

export default RegisterSuccess;
