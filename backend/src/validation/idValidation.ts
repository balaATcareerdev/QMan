import { z } from "zod";

export const idSchema = z.object({
  id: z.uuid(),
});

export const serviceIdSchema = z.object({
  serviceId: z.uuid(),
});
