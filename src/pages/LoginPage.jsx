import { Button, Card, Center, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../data/loginSchema";
import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertMessage from "../components/AlertMessage";
import { mapToFormFieldsFromSchema } from "../util/formUtil";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const isLoginSuccess = await login(data);
      isLoginSuccess && navigate("/");
    } catch (loginError) {
      setError("root", { message: loginError?.message });
    }
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
          {errors.root && (
            <AlertMessage status="warning" description={errors.root?.message} />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
              {mapToFormFieldsFromSchema(loginSchema, register, errors)}
              <Button type="submit" loading={isSubmitting} width="full" mt="4">
                Login
              </Button>
            </Flex>
          </form>
        </Card.Body>
        <Card.Footer flexDirection="column" justifyContent="center">
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

export default LoginPage;
