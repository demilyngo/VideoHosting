import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "..";

export interface CustomRequest extends Request {
  token: string | jwt.JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
