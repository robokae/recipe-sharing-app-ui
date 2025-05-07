import { Modal, ModalOverlay } from "@chakra-ui/modal";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Field,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { reviewSchema } from "../../data/reviewSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../../hooks/useApi";

function ReviewForm({ recipeId, username, handleClose }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });
  const { callApi } = useApi();

  const onSubmit = async (data) => {
    const rating = data.rating.toString();
    const request = { ...data, recipeId: recipeId, rating, username: username };
    await callApi("/api/review", "POST", request).then(
      (res) => res.status === 200 && handleClose()
    );
  };

  return (
    <Card.Root variant="elevated">
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="8">
            <Stack gap="4">
              <Field.Root invalid={errors.rating}>
                <Input
                  id="rating"
                  placeholder="Rating (0 to 5)"
                  {...register("rating")}
                />
                <Field.ErrorText>{errors.rating?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.description}>
                <Textarea
                  id="description"
                  placeholder="Review description..."
                  autoresize
                  {...register("description")}
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
            </Stack>
            <HStack justifyContent="flex-end" gap="4">
              <Button onClick={handleClose} variant="plain">
                Cancel
              </Button>
              <Button type="submit" colorPalette="green" paddingX="8">
                Submit
              </Button>
            </HStack>
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  );
}

export default ReviewForm;
