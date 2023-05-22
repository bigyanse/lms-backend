import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = "sshhh";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.lmst;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}
