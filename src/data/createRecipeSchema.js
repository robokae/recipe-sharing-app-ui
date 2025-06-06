import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(1, "Description is required"),
  featuredImage: z.array(z.instanceof(File)),
  completionTimeInMinutes: z.union([
    z.string().regex(/^\d+$/, "Completion time must be a valid number"),
    z.number(),
  ]),
  numServings: z.union([
    z.string().regex(/^\d+$/, "Number of servings must be a valid number"),
    z.number(),
  ]),
  ingredients: z.string().min(1, "At least one ingredient is required"),
  instructions: z.string().min(1, "At least one step is required"),
});
