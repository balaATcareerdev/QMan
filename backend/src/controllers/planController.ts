import type { NextFunction, Request, Response } from "express";
import { planService } from "../services/plan.service.js";

export const createPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await planService.createPlan(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
