// import type { Request, Response } from "express";
// import { createSlotSchema, idSchema } from "../validation/slotValidation.js";
// import { db } from "../database/db.js";
// import { slotSchema } from "../database/schema.js";

// export const createSlot = async (req: Request, res: Response) => {
//   const serviceId = req.params.serviceId;
//   const parsedId = idSchema.safeParse({
//     serviceId,
//   });

//   if (!parsedId.success) {
//     return res.status(400).json({ error: parsedId.error.issues });
//   }

//   const parsedBody = createSlotSchema.safeParse({
//     ...req.body,
//     serviceId,
//   });

//   if (!parsedBody.success) {
//     return res.status(400).json({ error: parsedBody.error.issues });
//   }

//   try {
//     const [createdSlot] = await db
//       .insert(slotSchema)
//       .values(parsedBody.data)
//       .returning();
//     return res.status(201).json(createdSlot);
//   } catch (error) {
//     console.log("Error creating slot:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
