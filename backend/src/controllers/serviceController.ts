import type { Request, Response } from "express";
import {
  createServiceSchema,
  idSchema,
  serviceIdSchema,
} from "../validation/serviceValidation.js";
import { db } from "../database/db.js";
import { serviceSchema, userSchema } from "../database/schema.js";
import { and, desc, eq, gte, lt } from "drizzle-orm";

export const createService = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const parsedId = idSchema.safeParse({ userId });
  if (!parsedId.success) {
    return res
      .status(400)
      .json({ error: "Invalid user ID", details: parsedId.error });
  }

  try {
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, userId),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const parsed = createServiceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: "Invalid service payload", details: parsed.error });
    }

    const [newService] = await db
      .insert(serviceSchema)
      .values({
        ...parsed.data,
        date: new Date(parsed.data.date),
        createdBy: userId,
      })
      .returning();

    if (!newService) {
      return res.status(500).json({ error: "Failed to create service" });
    }

    return res
      .status(201)
      .json({ message: "New Service Created", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getActiveServices = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Start of tomorrow (00:00:00)
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const services = await db.query.serviceSchema.findMany({
      where: and(
        gte(serviceSchema.date, startOfToday),
        lt(serviceSchema.date, startOfTomorrow),
        eq(serviceSchema.createdBy, userId),
      ),
      with: {
        slots: true,
      },
      orderBy: (service, { desc }) => [desc(service.createdAt)],
      limit: 5,
    });

    const now = new Date();

    const formattedServices = services.map((service) => {
      const activeSlots = service.slots.filter(
        (slot) => now > slot.startTime && slot.endTime > now,
      );
      return {
        id: service.id,
        serviceName: service.serviceName,
        description: service.description,
        date: service.date,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        isPaused: service.isPaused,
        activeSlots: activeSlots.length,
        avgSecPerPerson:
          activeSlots.length > 0
            ? activeSlots.reduce((acc, current) => acc + current.avgTime, 0) /
              activeSlots.length
            : 0,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Active services found",
      services: formattedServices,
    });
  } catch (error) {
    console.error("Error fetching active services:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUpcomingServices = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Start of tomorrow (00:00:00)
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const services = await db.query.serviceSchema.findMany({
      where: and(
        gte(serviceSchema.date, startOfTomorrow),
        eq(serviceSchema.createdBy, userId),
      ),
      with: {
        slots: true,
      },
      orderBy: (service, { desc }) => [desc(service.createdAt)],
      limit: 5,
    });

    const now = new Date();

    const formattedServices = services.map((service) => {
      const upcomingSlots = service.slots.filter(
        (slot) => now < slot.startTime,
      );

      return {
        id: service.id,
        serviceName: service.serviceName,
        description: service.description,
        date: service.date,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        isPaused: service.isPaused,
        activeSlots: upcomingSlots.length,
        avgSecPerPerson:
          upcomingSlots.length > 0
            ? upcomingSlots.reduce((acc, current) => acc + current.avgTime, 0) /
              upcomingSlots.length
            : 0,
        totalSlots: upcomingSlots.length,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Upcoming services found",
      services: formattedServices,
    });
  } catch (error) {
    console.error("Error fetching upcoming services:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getServiceStats = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Start of tomorrow (00:00:00)
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const services = await db.query.serviceSchema.findMany({
      where: and(
        gte(serviceSchema.date, startOfToday),
        lt(serviceSchema.date, startOfTomorrow),
        eq(serviceSchema.createdBy, userId),
      ),
      with: {
        slots: true,
      },
      orderBy: (service, { desc }) => [desc(service.createdAt)],
      limit: 5,
    });

    const avgTime = services.map(
      (service) =>
        service.slots.reduce((acc, slot) => acc + slot.avgTime, 0) /
        (service.slots.length || 1),
    );

    const now = new Date();

    const availableSlots = services.reduce(
      (acc, service) =>
        acc +
        service.slots.filter(
          (slot) => now > slot.startTime && slot.endTime > now,
        ).length,
      0,
    );

    return res.status(200).json({
      success: true,
      message: "Service stats found",
      stats: {
        activeService: services.length,
        avgTime:
          Math.round(
            avgTime.reduce((acc, time) => acc + time, 0) / services.length,
          ) || 0,
        availableSlots,
      },
    });
  } catch (error) {
    console.error("Error fetching service stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const startService = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  const serviceId = req.params.serviceId as string;

  const parseServiceId = serviceIdSchema.safeParse({ serviceId });

  if (!parseServiceId.success) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  try {
    const [updatedService] = await db
      .update(serviceSchema)
      .set({
        date: new Date(),
      })
      .where(
        and(
          eq(serviceSchema.id, parseServiceId.data.serviceId),
          eq(serviceSchema.createdBy, userId),
        ),
      )
      .returning();

    if (!updatedService) {
      return res
        .status(404)
        .json({ error: "Service not found or not authorized" });
    }

    return res.status(200).json({
      success: true,
      message: "Service started",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error starting service:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
