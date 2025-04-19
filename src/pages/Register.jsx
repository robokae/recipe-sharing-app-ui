import { Button, Card, Center, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import LabelledInputField from "../components/LabelledInputField";
import { Link, useNavigate } from "react-router-dom";
import { registerForm } from "../data/registerForm";
import { useApi } from "../hooks/useApi";

function Register() {
  const [registrationData, setRegistrationData] = useState(
    registerForm.fields.reduce((initialData, field) => {
      initialData[field.name] = "";
      return initialData;
    }, {})
  );
  const { callApi } = useApi();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (registrationData.password !== registrationData.passwordConfirmation) {
      setErrors((prev) => [
        ...prev,
        { field: "passwordConfirmation", error: "Passwords do not match" },
      ]);
      return;
    }

    const response = await callApi("/api/register", "POST", registrationData);
    response && navigate("/registerSuccess");
  };

  const updateField = (fieldName, value) => {
    setRegistrationData((prev) => ({
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
            Sign up
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4">
            {registerForm.fields.map((field, index) => (
              <LabelledInputField
                key={index}
                value={registrationData[field.name]}
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
    </Center>
  );
}

export default Register;
