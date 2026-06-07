import { and, eq, gte, lt } from "drizzle-orm/sql/expressions/conditions";
import { db } from "../database/db.js";
import { serviceSchema, slotSchema } from "../database/schema.js";
import type { serviceBody } from "../types/serviceTypes.js";
import { AppError } from "../errors/AppError.js";
import { desc, sql } from "drizzle-orm";

class ServicesService {
  async createNewService(data: serviceBody) {
    // Check Limitations based on user's subscription plan here - use row lock

    return db.transaction(async (tx) => {
      // lock row
      await tx.execute(sql`
        SELECT id
        FROM users
        WHERE id = ${data.id}
        FOR UPDATE
      `);

      const startOfDay = new Date(data.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);

      const services = await tx.query.serviceSchema.findMany({
        where: and(
          eq(serviceSchema.createdBy, data.id),
          gte(serviceSchema.date, startOfDay),
          lt(serviceSchema.date, endOfDay),
        ),
      });

      if (services.length >= data.maxActiveServices) {
        throw new AppError("Maximum active services limit reached", 400);
      }

      const [newService] = await tx
        .insert(serviceSchema)
        .values({
          serviceName: data.serviceName,
          description: data.description,
          date: new Date(data.date),
          createdBy: data.id,
        })
        .returning();

      return {
        service: newService,
      };
    });
  }

  async getActiveServices(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const services = await db
      .select({
        id: serviceSchema.id,
        serviceName: serviceSchema.serviceName,
        description: serviceSchema.description,
        date: serviceSchema.date,
        slotCount: sql<number>`count(${slotSchema.id})::int`,
      })
      .from(serviceSchema)
      .leftJoin(slotSchema, eq(slotSchema.serviceId, serviceSchema.id))
      .where(
        and(
          eq(serviceSchema.createdBy, userId),
          gte(serviceSchema.date, startOfDay),
          lt(serviceSchema.date, endOfDay),
        ),
      )
      .groupBy(serviceSchema.id)
      .orderBy(desc(serviceSchema.createdAt))
      .limit(5);

    if (!services) {
      throw new AppError("Error in fetching active services", 404);
    }
    return { services };
  }

  async getUpcomingServices(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tmr = new Date(today);
    tmr.setDate(tmr.getDate() + 1);

    const services = await db
      .select({
        id: serviceSchema.id,
        serviceName: serviceSchema.serviceName,
        description: serviceSchema.description,
        date: serviceSchema.date,
        slotCount: sql<number>`count(${slotSchema.id})`,
      })
      .from(serviceSchema)
      .leftJoin(slotSchema, eq(slotSchema.serviceId, serviceSchema.id))
      .where(
        and(eq(serviceSchema.createdBy, userId), gte(serviceSchema.date, tmr)),
      )
      .groupBy(serviceSchema.id)
      .orderBy(desc(serviceSchema.createdAt))
      .limit(5);

    if (!services) {
      throw new AppError("Error in fetching upcoming services", 404);
    }

    return { services };
  }

  async getServiceStats(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tmr = new Date(today);
    tmr.setDate(tmr.getDate() + 1);

    const [stats] = await db
      .select({
        activeServices: sql<number>`
      count(distinct ${serviceSchema.id})::int
    `,
        activeSlots: sql<number>`
      count(${slotSchema.id})::int
    `,
      })
      .from(serviceSchema)
      .leftJoin(slotSchema, eq(slotSchema.serviceId, serviceSchema.id))
      .where(
        and(
          eq(serviceSchema.createdBy, userId),
          gte(serviceSchema.date, today),
          lt(serviceSchema.date, tmr),
        ),
      );
    return { stats };
  }

  async activateService(serviceId: string, userId: string, maxService: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tmr = new Date(today);
    tmr.setDate(tmr.getDate() + 1);

    return db.transaction(async (tx) => {
      const service = await db.query.serviceSchema.findFirst({
        where: and(
          eq(serviceSchema.id, serviceId),
          eq(serviceSchema.createdBy, userId),
        ),
      });

      if (!service) {
        throw new AppError("Service not found", 404);
      }

      const serviceDate = new Date(service.date);
      serviceDate.setHours(0, 0, 0, 0);
      if (serviceDate < today) {
        throw new AppError("Cannot activate an expired service", 400);
      }

      if (service.date >= today && service.date < tmr) {
        throw new AppError("Service is already active", 400);
      }

      await tx.execute(sql`
        SELECT id
        FROM users
        WHERE id = ${userId}
        FOR UPDATE
      `);

      const services = await tx.query.serviceSchema.findMany({
        where: and(
          eq(serviceSchema.createdBy, userId),
          gte(serviceSchema.date, today),
          lt(serviceSchema.date, tmr),
        ),
      });

      if (services.length >= maxService) {
        throw new AppError("Maximum active services limit reached", 400);
      }

      const [updatedService] = await tx
        .update(serviceSchema)
        .set({
          date: new Date(),
        })
        .where(
          and(
            eq(serviceSchema.id, serviceId),
            eq(serviceSchema.createdBy, userId),
          ),
        )
        .returning();

      if (!updatedService) {
        throw new AppError("Service not found or not authorized", 404);
      }

      return {
        service: updatedService,
      };
    });
  }
}

export const servicesService = new ServicesService();
