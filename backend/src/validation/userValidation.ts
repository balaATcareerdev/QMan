import { z } from "zod";

export const idSchema = z.object({
  id: z.string().uuid(),
});

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["Client", "Customer"]).default("Customer"),
});

export const verifyExistingUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
