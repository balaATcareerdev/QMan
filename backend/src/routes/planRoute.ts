import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createPlanSchema } from "../validation/planValidation.js";
import { createPlan } from "../controllers/planController.js";

export const planRouter = Router();

planRouter.post("/create", validate(createPlanSchema), createPlan);
