import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), "Rating must be a valid number")
    .refine(
      (value) => value >= 0 && value <= 5,
      "Rating must be between 0 and 5"
    ),
  description: z.string().min(1, "Review description cannot be blank"),
});
