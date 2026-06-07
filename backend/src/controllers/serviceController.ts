import type { NextFunction, Request, Response } from "express";
import {
  createServiceSchema,
  idSchema,
  serviceIdSchema,
} from "../validation/serviceValidation.js";
import { db } from "../database/db.js";
import { serviceSchema, userSchema } from "../database/schema.js";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { servicesService } from "../services/services.service.js";
import { AppError } from "../errors/AppError.js";

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const result = await servicesService.createNewService({
      ...req.body,
      id: userId,
      maxActiveServices: req.maxActiveServices,
    });

    return res.status(201).json({
      success: true,
      service: result.service,
      createdBy: userId,
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  try {
    const result = await servicesService.getActiveServices(userId);

    return res.status(200).json({
      success: true,
      message: "Active services found",
      services: result.services,
    });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await servicesService.getUpcomingServices(userId);

    return res.status(200).json({
      success: true,
      message: "Upcoming services found",
      services: result.services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await servicesService.getServiceStats(userId);

    return res.status(200).json({
      success: true,
      message: "Service stats found",
      stats: result.stats,
    });
  } catch (error) {
    next(error);
  }
};

export const activateService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  const serviceId = req.params.serviceId as string;

  if (req.maxActiveServices == null) {
    throw new AppError("Max active services limit is required", 400);
  }

  try {
    const result = await servicesService.activateService(
      serviceId,
      userId,
      req.maxActiveServices,
    );

    return res.status(200).json({
      success: true,
      message: "Service activated",
      service: result.service,
    });
  } catch (error) {
    next(error);
  }
};
