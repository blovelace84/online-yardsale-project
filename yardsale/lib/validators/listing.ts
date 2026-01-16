import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(3, "Title is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price must be greater than 0"),
  ),
  description: z.string().optional(),
});
