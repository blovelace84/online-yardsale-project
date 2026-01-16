import { z } from "zod";

export const registerSchema = z.object({
    email:z.string().email("Enter a valid email"),
    password: z
        .string()
        .min(10, "Password must be at least 10 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});