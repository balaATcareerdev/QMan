import bcrypt from "bcryptjs";
import { db } from "../database/db.js";
import { userSchema } from "../database/schema.js";
import {
  createUserSchema,
  verifyExistingUserSchema,
} from "../validation/userValidation.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid user payload", details: parsed.error });
  }

  try {
    // existing User
    const existingUser = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, parsed.data.email),
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    const [user] = await db
      .insert(userSchema)
      .values({ ...parsed.data, password: hashedPassword })
      .returning();

    if (!user) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    // Handle race condition: unique constraint violation
    // PostgreSQL duplicate key error code = 23505
    if (error?.code === "23505") {
      return res.status(409).json({
        error: "Email already in use",
      });
    }

    console.error("Register error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = verifyExistingUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid login payload", details: parsed.error });
  }

  try {
    const existingUser = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, parsed.data.email),
    });

    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      existingUser.password,
    );

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const isAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No user ID found in request",
      });
    }

    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, userId),
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
