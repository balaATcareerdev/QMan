import { and, eq, sql } from "drizzle-orm";
import { db } from "../database/db.js";
import { serviceSchema, slotSchema } from "../database/schema.js";
import type { slotBody } from "../types/slotTypes.js";
import { AppError } from "../errors/AppError.js";

class SlotService {
  async getSlotStats(serviceId: string) {
    const [service, totalSlots, activeSlots] = await Promise.all([
      this.getService(serviceId),
      this.getTotalSlots(serviceId),
      this.getActiveSlots(serviceId),
    ]);

    console.log("Service found for slot stats:", service);

    return {
      service,
      totalSlots,
      activeSlots,
    };
  }

  async getService(serviceId: string) {
    return db.query.serviceSchema.findFirst({
      where: eq(serviceSchema.id, serviceId),
    });
  }

  async getTotalSlots(serviceId: string) {
    const result = await db.execute(sql`
        SELECT COUNT(*) AS totalSlots
        FROM ${slotSchema}
        WHERE ${slotSchema.serviceId} = ${serviceId}
        `);

    console.log("Total slots result:", result);
    return Number(result[0]?.totalslots) || 0;
  }

  async getActiveSlots(serviceId: string) {
    const result = await db.execute(sql`
            SELECT *
            FROM ${slotSchema}
            WHERE ${slotSchema.serviceId} = ${serviceId} AND ${slotSchema.startTime} <= NOW() AND (${slotSchema.endTime} IS NULL OR ${slotSchema.endTime} >= NOW())
        `);

    return { activeSlots: result };
  }

  async createSlot(param: slotBody) {
    const service = await db.query.serviceSchema.findFirst({
      where: and(
        eq(serviceSchema.id, param.serviceId),
        eq(serviceSchema.createdBy, param.id),
      ),
    });

    if (!service) {
      throw new AppError(
        "You dont have permission to create a slot for this service",
        404,
      );
    }

    return db.transaction(async (tx) => {
      // Lock the user row to prevent concurrent slot creation for the same user
      await tx.execute(sql`
        Select id
        FROM users
        Where id = ${param.id}
        For Update
        `);

      const startTime = new Date(param.startTime).toISOString();

      const endTime = new Date(param.endTime).toISOString();

      const slots = await tx.execute(sql`
        Select count(*) As slotCount
        From ${slotSchema} sl
        Inner Join ${serviceSchema} s On sl.service_id = s.id
          WHERE s.created_by = ${param.id}
        AND sl.start_time < ${endTime}
        AND sl.end_time > ${startTime}
        `);

      const stCount = Number(slots[0]?.slotcount) || 0;

      console.log("Current active slots count for user:", stCount);

      if (stCount >= param.maxActiveSlots) {
        throw new AppError("Maximum active slots limit reached", 400);
      }

      const [newSlot] = await tx
        .insert(slotSchema)
        .values({
          serviceId: param.serviceId,
          slotName: param.slotName,
          startTime: new Date(param.startTime),
          isPaused: false,
          endTime: new Date(param.endTime),
          capacity: param.capacity,
        })
        .returning();

      return {
        slot: newSlot,
      };
    });
  }

  async getAllActiveSlots(serviceId: string, userId: string) {
    const service = await db.query.serviceSchema.findFirst({
      where: and(
        eq(serviceSchema.id, serviceId),
        eq(serviceSchema.createdBy, userId),
      ),
    });

    if (!service) {
      throw new AppError(
        "You don't have permission to view slots for this service",
        403,
      );
    }

    const now = await db.execute(sql`SELECT NOW()`);
    console.log(now);

    const result = await db.execute(sql`
      SELECT COUNT(*) AS activeSlots
            FROM ${slotSchema}
            WHERE ${slotSchema.serviceId} = ${serviceId} AND ${slotSchema.startTime} <= NOW() AND (${slotSchema.endTime} IS NULL OR ${slotSchema.endTime} >= NOW())
      `);

    console.log("Active slots result:", result);

    return { activeSlots: Number(result[0]?.activeslots) || 0 };
  }

  async getUpcomingSlots(serviceId: string, id: string) {
    const service = await db.query.serviceSchema.findFirst({
      where: and(
        eq(serviceSchema.id, serviceId),
        eq(serviceSchema.createdBy, id),
      ),
    });

    if (!service) {
      throw new AppError(
        "You don't have permission to view slots for this service",
        403,
      );
    }

    const result = await db.execute(sql`
      SELECT *
      FROM ${slotSchema}
      WHERE ${slotSchema.serviceId} = ${serviceId} AND ${slotSchema.startTime} > NOW()
      ORDER BY ${slotSchema.startTime} ASC
    `);
    return { upcomingSlots: result };
  }
}

export const slotService = new SlotService();
