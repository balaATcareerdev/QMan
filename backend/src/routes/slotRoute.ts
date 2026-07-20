import { Router } from "express";
import {
  createNewSlot,
  getActiveSlots,
  getSlotStats,
  getUpcomingSlots,
} from "../controllers/slotController.js";
import { userAuth } from "../middleware/userAuth.js";
import { roleValidate, validate } from "../middleware/validate.js";
import { createSlotSchema } from "../validation/slotValidation.js";

export const slotRouter = Router();

slotRouter.get("/stats", userAuth, roleValidate("Client"), getSlotStats);

slotRouter.post(
  "/create",
  userAuth,
  roleValidate("Client"),
  validate(createSlotSchema),
  createNewSlot,
);

slotRouter.get("/all-active", userAuth, roleValidate("Client"), getActiveSlots);

slotRouter.get(
  "/all-upcoming",
  userAuth,
  roleValidate("Client"),
  getUpcomingSlots,
);

export default slotRouter;
