import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticateRequest extends Request {
  userId?: string;
}
export interface IJwtServiceClass {
  createToken(userId: number): string;
  authenticateToken(
    req: AuthenticateRequest,
    res: Response,
    next: NextFunction,
  ): void;
}

export default class JwtService implements IJwtServiceClass {
  private jwtSecretToken: string;
  constructor() {
    this.jwtSecretToken = process.env.JWT_SECRET_TOKEN || "ifj2h34vds90302n,2";
  }

  public createToken = (userId: number): string => {
    const minutes = 60 * 60;
    const hour = 60 * minutes;
    const day = 24 * hour;
    const expiresIn = 7 * day;

    const token = jwt.sign({ userId }, this.jwtSecretToken, { expiresIn });

    return token;
  };

  public authenticateToken = (
    req: AuthenticateRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided." });
      return;
    }

    jwt.verify(token, this.jwtSecretToken, (err, decoded: any) => {
      if (err) {
        res.status(403).json({ message: "invalid token" });
        return;
      }
      req.userId = decoded.userId;
      next();
    });
  };
}
