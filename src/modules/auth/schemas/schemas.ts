import { z } from "zod";

export const registerSchemas = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must be less than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive dashes"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchemas = z.object({
        email: z.string().email(),
        password: z.string().min(1, "Password is required"),
      })