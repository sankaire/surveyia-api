import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ITokenPayload } from "../interfaces";

const jwT_secret = process.env.JWT_SECRET;
if (jwT_secret === undefined) throw new Error("JWT_SECRET is undefined");

const ensure_is_authendicated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
      data: null,
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwT_secret);
    const { data } = decoded as ITokenPayload;
    req.user = {
      id: data,
    };
    return next();
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
      data: err,
    });
  }
};
export default { ensure_is_authendicated };
