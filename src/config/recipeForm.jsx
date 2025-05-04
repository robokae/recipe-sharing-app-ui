export const config = {
  sections: [
    {
      heading: "Summary",
      description: "Brief description of your recipe",
      fields: [
        {
          name: "title",
          label: "Title",
          fieldType: "text",
        },
        {
          name: "description",
          label: "Description",
          fieldType: "textarea",
        },
        {
          name: "completionTimeInMinutes",
          label: "Completion time (minutes)",
          fieldType: "text",
        },
        {
          name: "numServings",
          label: "Number of servings",
          fieldType: "text",
        },
      ],
    },
    {
      heading: "Featured image",
      description: "Select a recipe thumbnail image",
      fields: [
        {
          name: "featuredImage",
          maxFiles: 1,
          fileTypes: ["jpg", "png"],
          fieldType: "fileUpload",
        },
      ],
    },
    {
      heading: "Ingredients",
      description:
        "List out the ingredients and their quantities (e.g., 1 cup flour)",
      fields: [
        {
          name: "ingredients",
          label: "Enter each ingredient in a separate line",
          fieldType: "textarea",
        },
      ],
    },
    {
      heading: "Instructions",
      description: "Provide the step-by-step instructions",
      fields: [
        {
          name: "instructions",
          label: "Enter each step in a separate line",
          fieldType: "textarea",
        },
      ],
    },
  ],
};
