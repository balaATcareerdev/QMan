import { Request } from "express";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: string;
      maxActiveTokens?: number;
      maxActiveServices?: number;
      maxActiveSlots?: number;
    }
  }
}

export {};
