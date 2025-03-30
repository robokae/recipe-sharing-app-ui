import { Box, Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import LabelledInputField from "../components/LabelledInputField";
import { Link } from "react-router-dom";
import { loginForm } from "../data/loginForm";

function Login() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    console.log(inputData);
  };

  const updateField = (fieldName, value) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      height="100vh"
      padding="4"
      pt="32"
    >
      <Card.Root width="md">
        <Card.Header>
          <Card.Title fontSize="2xl" textAlign="center">
            Login
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack>
            {loginForm.fields.map((field, index) => (
              <LabelledInputField
                key={index}
                label={field.label}
                value={inputData[field.name]}
                type={field.type}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ))}
          </Stack>
        </Card.Body>
        <Card.Footer flexDirection="column" justifyContent="center">
          <Button width="full" onClick={handleLogin} mb="2">
            Login
          </Button>
          <Card.Description>
            Don't have an account? Create one{" "}
            <Text as="span" textDecoration="underline">
              <Link to="/register">here</Link>
            </Text>
          </Card.Description>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default Login;
