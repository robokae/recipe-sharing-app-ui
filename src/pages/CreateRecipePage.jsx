import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipeSchema } from "../data/createRecipeSchema";
import FormField from "../components/FormField";
import ListInput from "../components/ListInput";

function CreateRecipePage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(createRecipeSchema),
  });
  const { user } = useAuth();
  const { callApi } = useApi();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user) {
      const createRequest = new FormData();
      const recipeDetails = {};

      Object.entries(data).forEach(([key, value]) => {
        if (key === "ingredients" || key == "instructions") {
          recipeDetails[key] = value.join(", ");
        } else if (key !== "featuredImage") {
          recipeDetails[key] = value;
        }
      });

      recipeDetails.username = user.username;
      createRequest.append("featuredImage", data.featuredImage?.[0]);
      createRequest.append(
        "recipeRequest",
        new Blob([JSON.stringify(recipeDetails)], { type: "application/json" })
      );

      await callApi("/api/recipe", "POST", createRequest, {
        contentType: "multipart/form-data",
      }).then((res) => res.status === 200 && navigate("/"));
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Flex width={["full", "full", "3/4"]}>
      <Box flex="1">
        <Heading fontSize="3xl" mb="16">
          Create a new recipe
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            separator={<StackSeparator />}
            display="flex"
            flexDirection="column"
            gap="8"
            mb="16"
          >
            <Flex gap="8">
              <Box width="1/4">
                <Heading>Summary</Heading>
                <Text color="fg.subtle">Brief description of your recipe</Text>
              </Box>
              <Box display="flex" flexDirection="column" flex="1" gap="8">
                <FormField
                  name="title"
                  label="Title"
                  register={register}
                  errors={errors}
                />
                <FormField
                  name="description"
                  label="Description"
                  register={register}
                  errors={errors}
                />
                <FormField
                  name="completionTimeInMinutes"
                  label="Completion time (minutes)"
                  register={register}
                  errors={errors}
                />
                <FormField
                  name="numServings"
                  label="Number of servings"
                  register={register}
                  errors={errors}
                />
              </Box>
            </Flex>
            <Flex gap="8">
              <Box width="1/4">
                <Heading>Featured image</Heading>
                <Text color="fg.subtle">Select a recipe thumbnail image</Text>
              </Box>
              <Box>
                <FileUploader
                  name="featuredImage"
                  maxFiles={1}
                  fileTypes={["jpg", "png"]}
                  setValue={setValue}
                  watch={watch}
                />
              </Box>
            </Flex>
            <Flex gap="8">
              <Box width="1/4">
                <Heading>Ingredients</Heading>
                <Text color="fg.subtle">
                  List out the ingredients and their quantities (e.g., 1 cup
                  flour)
                </Text>
              </Box>
              <Box gap="4" flex="1">
                <Field.Root invalid={errors.ingredients}>
                  <Field.ErrorText>
                    {errors.ingredients?.message}
                  </Field.ErrorText>
                  <ListInput
                    setValue={setValue}
                    fieldName="ingredients"
                    itemName="ingredient"
                  />
                </Field.Root>
              </Box>
            </Flex>
            <Flex gap="8">
              <Box width="1/4">
                <Heading>Instructions</Heading>
                <Text color="fg.subtle">
                  Provide the step-by-step instructions
                </Text>
              </Box>
              <Flex flex="1" direction="column" gap="4">
                <Field.Root invalid={errors.instructions}>
                  <Field.ErrorText>
                    {errors.instructions?.message}
                  </Field.ErrorText>
                  <ListInput
                    setValue={setValue}
                    fieldName="instructions"
                    itemName="step"
                  />
                </Field.Root>
              </Flex>
            </Flex>
          </Stack>
          <Box display="flex" justifyContent="flex-end" gap="4">
            <Button onClick={handleCancel} variant="link">
              Cancel
            </Button>
            <Button type="submit" colorPalette="green" paddingX="8">
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}

export default CreateRecipePage;
