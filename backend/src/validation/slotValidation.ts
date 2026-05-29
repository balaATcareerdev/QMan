import { z } from "zod";

export const idSchema = z.object({
  serviceId: z.string().uuid(),
});

export const createSlotSchema = z.object({
  serviceId: z.string().uuid(),
  serviceName: z.string().min(1, "Service name is required"),
  createdAt: z.coerce.date().min(1, "Creation date is required"),
  startTime: z.coerce.date().min(1, "Start time is required"),
  endTime: z.coerce.date().min(1, "End time is required"),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
  bookedCount: z
    .number()
    .int()
    .nonnegative("Booked count cannot be negative")
    .default(0),
  currentToken: z.number().int().optional().default(0),
  avgTime: z.number().int().optional().default(0),
  completedCount: z.number().int().optional().default(0),
});
