import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Not authorized, invalid token",
    });
  }
};
