import { z } from "zod";

export const createPlanSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  maxActiveTokens: z
    .number()
    .int()
    .nonnegative("Max active tokens must be a non-negative integer"),
  maxActiveServices: z
    .number()
    .int()
    .nonnegative("Max active services must be a non-negative integer"),
  maxActiveSlots: z
    .number()
    .int()
    .nonnegative("Max active slots must be a non-negative integer"),
});
