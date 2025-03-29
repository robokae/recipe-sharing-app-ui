import { Box, Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

function Login() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    console.log(inputData);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="4"
    >
      <Card.Root width="md">
        <Card.Header>
          <Card.Title textAlign="center">Login</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack>
            <Field.Root>
              <Field.Label mb="2">Username</Field.Label>
              <Input
                value={inputData.username}
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </Field.Root>
            <Field.Root>
              <Field.Label mb="2">Password</Field.Label>
              <Input
                value={inputData.password}
                type="password"
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="center">
          <Button width="full" onClick={handleLogin}>
            Login
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default Login;
