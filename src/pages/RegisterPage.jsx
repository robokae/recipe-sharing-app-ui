import { Button, Card, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../data/registerSchema";
import { mapToFormFieldsFromSchema } from "../util/formUtil";
import AlertMessage from "../components/AlertMessage";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { callApi } = useApi();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await callApi("/api/register", "POST", data);
    if (!response.error) {
      navigate("/registerSuccess");
    }
    setError("root", {
      message: response.error,
    });
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
        <Card.Body gap="8">
          {errors.root && (
            <AlertMessage status="warning" description={errors.root?.message} />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
              {mapToFormFieldsFromSchema(registerSchema, register, errors)}
              <Button type="submit" loading={isSubmitting} width="full" mt="4">
                Register
              </Button>
            </Flex>
          </form>
        </Card.Body>
        <Card.Footer flexDirection="column" justifyContent="center">
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

export default RegisterPage;
