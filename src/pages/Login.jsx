import {
  Box,
  Button,
  Card,
  Center,
  Field,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LabelledInputField from "../components/LabelledInputField";
import { Link, useNavigate } from "react-router-dom";
import { loginForm } from "../data/loginForm";
import { useApi } from "../hooks/useApi";
import { useToken } from "../hooks/useToken";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { data, isLoading, callApi } = useApi();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await callApi("/api/login", "POST", loginData);
    if (response && response.status === 200) {
      const token = response.headers.authorization;
      const userDetails = response.data;
      login(userDetails, token);
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
        <Card.Body>
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
    </Center>
  );
}

export default Login;
