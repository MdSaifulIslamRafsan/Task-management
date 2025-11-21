import httpStatus from "http-status";

import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../ modules/User/user.model";
import AppError from "../errors/AppError";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid authorization");
    }

    // decode token
    const decoded = jwt.verify(
      token,
      config.access_token as string
    ) as JwtPayload;

    const { id } = decoded;

    const user = await User.findById(id);
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, "User not found");
    }

    req.user = decoded;
    next();
  });
};

export default auth;
