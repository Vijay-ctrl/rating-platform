import { z } from "zod";

export const ratingSchema = z.object({
   storeId: z
      .number({
         error: "Store ID must be a number",
      })
      .int("Store ID must be an integer")
      .positive("Store ID must be positive"),

   rating: z
      .number({
         error: "Rating must be a number",
      })
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5"),
});