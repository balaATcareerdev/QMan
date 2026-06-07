import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../errors/AppError.js";
import { db } from "../database/db.js";
import { userSchema } from "../database/schema.js";
import { eq } from "drizzle-orm";

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error.issues,
        message: "Invalid Payload",
      });
    }
    req.body = result.data;
    return next();
  };

export const roleValidate =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User ID is required" });
    }

    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, userId),
      with: {
        plan: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.plan) {
      return next(new AppError("User subscription plan not found", 500));
    }

    req.role = user.role;
    req.maxActiveTokens = user.plan.maxActiveTokens;
    req.maxActiveServices = user.plan.maxActiveServices;
    req.maxActiveSlots = user.plan.maxActiveSlots;

    if (user.role !== role) {
      return res
        .status(403)
        .json({ error: "Forbidden", message: "Insufficient permissions" });
    }
    next();
  };

export const validateParamId =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error.issues,
        message: "Invalid Parameter ID",
      });
    }
    return next();
  };
