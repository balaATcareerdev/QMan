import type { NextFunction, Request, Response } from "express";
import { slotService } from "../services/slot.services.js";
import { AppError } from "../errors/AppError.js";

export const getSlotStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const serviceId = req.query.serviceId as string;

    if (!serviceId) {
      throw new AppError("Service ID is required", 400);
    }

    console.log("Received request for slot stats with serviceId:", serviceId);

    const result = await slotService.getSlotStats(serviceId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createNewSlot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const serviceId = req.body.serviceId as string;
    const userId = req.userId;
    if (!serviceId) {
      throw new AppError("Service ID is required", 400);
    }

    console.log(
      "Received request to create new slot with serviceId:",
      serviceId,
    );

    const result = await slotService.createSlot({
      ...req.body,
      serviceId,
      id: userId,
      maxActiveSlots: req.maxActiveSlots,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getActiveSlots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const serviceId = req.query.serviceId as string;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required" });
  }

  try {
    const result = await slotService.getAllActiveSlots(serviceId, userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUpcomingSlots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const serviceId = req.query.serviceId as string;

  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required" });
  }

  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await slotService.getUpcomingSlots(serviceId, userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
