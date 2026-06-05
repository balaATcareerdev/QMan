import { z } from "zod";

const roleEnumValues = ["Client", "Customer"] as const;

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(roleEnumValues).default("Customer"),
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
