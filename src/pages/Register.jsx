import { Box, Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import LabelledInputField from "../components/LabelledInputField";
import { Link } from "react-router-dom";
import { registerForm } from "../data/registerForm";

function Register() {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleRegister = () => {
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
            Sign up
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4">
            {registerForm.fields.map((field, index) => (
              <LabelledInputField
                key={index}
                value={inputData[field.name]}
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ))}
          </Stack>
        </Card.Body>
        <Card.Footer flexDirection="column" justifyContent="center">
          <Button width="full" onClick={handleRegister} mb="2">
            Register
          </Button>
          <Card.Description>
            Already have an account? Sign in{" "}
            <Text as="span" textDecoration="underline">
              <Link to="/login">here</Link>
            </Text>
          </Card.Description>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default Register;
