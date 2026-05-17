import { z } from "zod";

export const idSchema = z.object({
  id: z.string().uuid(),
});

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["Client", "Customer"]).default("Customer"),
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
});

export const verifyExistingUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
