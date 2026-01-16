import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2, "Name is too short"),
  username: z
    .string()
    .min(3)
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and _"),
});
