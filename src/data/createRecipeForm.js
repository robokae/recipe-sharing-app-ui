export const createRecipeForm = {
  heading: "New Recipe",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
    },
    {
      name: "completionTimeInMinutes",
      type: "text",
      label: "Completion time (minutes)",
    },
    {
      name: "numServings",
      type: "text",
      label: "Number of servings",
    },
    {
      name: "ingredients",
      input: "textarea",
      type: "text",
      label: "Ingredients (enter each in a new line)",
    },
    {
      name: "instructions",
      input: "textarea",
      type: "text",
      label: "Instructions",
    },
  ],
};
