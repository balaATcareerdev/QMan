import { z } from "zod";

export const idSchema = z.object({
  userId: z.string().uuid(),
});

export const serviceIdSchema = z.object({
  serviceId: z.string().uuid(),
});

export const createServiceSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
});
