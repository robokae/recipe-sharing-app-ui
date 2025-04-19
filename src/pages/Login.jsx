import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import LabelledInputField from "../components/LabelledInputField";
import { Link, useNavigate } from "react-router-dom";
import { loginForm } from "../data/loginForm";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const isLoginSuccess = await login(loginData);
    if (!isLoading && isLoginSuccess) {
      navigate("/");
    }
  };

  const updateField = (fieldName, value) => {
    setLoginData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <Center padding="4" mt="16">
      <Card.Root
        width="md"
        borderWidth={["0", "1px"]}
        background={["transparent", "gray.950"]}
      >
        <Card.Header>
          <Card.Title fontSize="2xl" textAlign="center">
            Login
          </Card.Title>
        </Card.Header>
        <Card.Body gap="8">
          {error && (
            <Alert.Root width="full" status="warning" variant="surface">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>{error?.message || error}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
          <Stack gap="4">
            {loginForm.fields.map((field, index) => (
              <LabelledInputField
                key={index}
                label={field.label}
                value={loginData[field.name]}
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ))}
          </Stack>
        </Card.Body>
        <Card.Footer flexDirection="column" justifyContent="center">
          <Button loading={isLoading} width="full" onClick={handleLogin} mb="2">
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
    </Center>
  );
}

export default Login;
