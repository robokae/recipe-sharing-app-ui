import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { createRecipeForm } from "../data/createRecipeForm";
import { useForm } from "../hooks/useForm";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const { formData, handleChange } = useForm(
    createRecipeForm.fields.reduce((initialData, field) => {
      initialData[field.name] = "";
      return initialData;
    }, {})
  );

  const { data, isLoading, error, callApi } = useApi();

  const navigate = useNavigate();

  const handleCreate = async () => {
    const response = await callApi("/api/recipe", "POST", formData);
    if (response && response.status === 200) {
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Center>
      <Box width={["md", "xl"]} mt="16" padding="4">
        <Heading fontSize="3xl" textAlign="center" mb="8">
          {createRecipeForm.heading}
        </Heading>
        <Box display="flex" flexDirection="column" gap="8" mb="8">
          {createRecipeForm.fields.map((field, index) => (
            <FormControl key={index}>
              <FormLabel>{field.label}</FormLabel>
              {field.input === "textarea" ? (
                <Textarea
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : (
                <Input
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  type={field.type}
                />
              )}
            </FormControl>
          ))}
        </Box>
        <Box display="flex" gap="4">
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleCancel} variant="link">
            Cancel
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default CreateRecipe;
