import { z } from "zod";

export const idSchema = z.object({
  serviceId: z.uuid(),
});

export const createSlotSchema = z.object({
  serviceId: z.uuid(),
  slotName: z.string().min(1, "Slot name is required"),
  // createdAt: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
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
