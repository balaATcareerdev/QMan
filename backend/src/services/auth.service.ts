import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { planSchema, userSchema } from "../database/schema.js";
import type { LoginBody, RegisterBody } from "../types/authTypes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

class AuthService {
  async register(data: RegisterBody) {
    const existingUser = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, data.email),
    });

    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const freePlan = await this.getFreePlan();

    if (!freePlan) {
      throw new AppError("Free plan not found", 404);
    }

    const [user] = await db
      .insert(userSchema)
      .values({
        ...data,
        password: hashedPassword,
        subscriptionId: freePlan.id,
      })
      .returning();

    if (!user) {
      throw new AppError("Failed to create user", 500);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fname: user.fname,
        lname: user.lname,
      },
      token,
    };
  }

  async login(data: LoginBody) {
    const existingUser = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, data.email),
    });

    if (!existingUser) {
      throw new AppError("Invalid email", 400);
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!passwordMatch) {
      throw new AppError("Invalid password", 400);
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return {
      user: {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        fname: existingUser.fname,
        lname: existingUser.lname,
      },
      token,
    };
  }

  async getAuth(userId: string) {
    const existingUser = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, userId),
    });

    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    return {
      user: {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        fname: existingUser.fname,
        lname: existingUser.lname,
      },
    };
  }

  async getFreePlan() {
    const freePlan = await db.query.planSchema.findFirst({
      where: eq(planSchema.planName, "Free"),
    });
    return freePlan;
  }
}

export const authService = new AuthService();
