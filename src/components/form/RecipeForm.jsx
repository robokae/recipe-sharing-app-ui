import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import FormField from "../FormField";
import FileUploader from "../FileUploader";
import { config } from "../../config/recipeForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipeSchema } from "../../data/createRecipeSchema";
import { useAuth } from "../../context/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RecipeForm({ id, initialValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRecipeSchema),
  });
  const { user } = useAuth();
  const { callApi } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      const {
        title,
        description,
        completionTimeInMinutes,
        numServings,
        ingredients,
        instructions,
      } = initialValues;
      Object.entries({
        title,
        description,
        completionTimeInMinutes,
        numServings,
        ingredients,
        instructions,
      }).forEach(([key, value]) => {
        value && setValue(key, value);
      });
    }
  }, [initialValues]);

  const onSubmit = async (data) => {
    if (user) {
      const recipeDetails = {};

      Object.entries(data).forEach(([key, value]) => {
        if (key === "completionTimeInMinutes" || key === "numServings") {
          recipeDetails[key] = value.toString();
        } else if (key !== "featuredImage") {
          recipeDetails[key] = value;
        }
      });

      const request = new FormData();
      request.append("featuredImage", data.featuredImage?.[0]);

      initialValues
        ? await patchRecipe(request, recipeDetails)
        : await postRecipe(request, recipeDetails);
    }
  };

  const postRecipe = async (request, recipeDetails) => {
    recipeDetails.username = user.username;
    request.append(
      "recipeRequest",
      new Blob([JSON.stringify(recipeDetails)], { type: "application/json" })
    );

    await callApi("/api/recipe", "POST", request, {
      contentType: "multipart/form-data",
    }).then((res) => res.status === 200 && navigate("/"));
  };

  const patchRecipe = async (request, recipeDetails) => {
    request.append(
      "recipeRequest",
      new Blob([JSON.stringify(recipeDetails)], { type: "application/json" })
    );
    console.log(recipeDetails);

    await callApi(`/api/recipe/${id}`, "PATCH", request, {
      contentType: "multipart/form-data",
    }).then((res) => res.status === 200 && navigate(`/`));
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        separator={<StackSeparator />}
        display="flex"
        flexDirection="column"
        gap="8"
        mb="16"
      >
        {config.sections.map((section, index) => (
          <Flex gap="8" key={index}>
            <Box width="1/4">
              <Heading>{section.heading}</Heading>
              <Text color="fg.subtle">{section.description}</Text>
            </Box>
            <Flex direction="column" flex="1" gap="8">
              {section.fields.map((field, index) =>
                field.fieldType === "fileUpload" ? (
                  <FileUploader
                    key={index}
                    name={field.name}
                    maxFiles={field.maxFiles}
                    fileTypes={field.fileTypes}
                    setValue={setValue}
                    watch={watch}
                  />
                ) : (
                  <FormField
                    key={index}
                    name={field.name}
                    label={field.label}
                    value={initialValues ? initialValues[field.name] ?? "" : ""}
                    inputType={field.inputType}
                    fieldType={field.fieldType}
                    register={register}
                    errors={errors}
                  />
                )
              )}
            </Flex>
          </Flex>
        ))}
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
  );
}

export default RecipeForm;
