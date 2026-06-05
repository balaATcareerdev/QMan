import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import type { planBody } from "../types/planTypes.js";
import { planSchema } from "../database/schema.js";
import { AppError } from "../errors/AppError.js";

class PlanService {
  async createPlan(planData: planBody) {
    const existingPlan = await db.query.planSchema.findFirst({
      where: eq(planSchema.planName, planData.planName),
    });

    if (existingPlan) {
      throw new AppError("Plan with this name already exists", 409);
    }

    const [plan] = await db
      .insert(planSchema)
      .values({ ...planData })
      .returning();
    return plan;
  }
}

export const planService = new PlanService();
