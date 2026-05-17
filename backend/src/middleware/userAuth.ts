import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "No token provided" });
  }

  try {
    const tokenDecode = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (!tokenDecode?.id) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Token decoded but no id field found",
      });
    }

    req.userId = tokenDecode.id;

    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    return res.status(401).json({
      error: "Invalid token",
      message: error instanceof Error ? error.message : "Unknown error",
      details:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
            }
          : error,
    });
  }
};
