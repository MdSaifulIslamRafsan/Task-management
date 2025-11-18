import { Model, Types } from "mongoose";

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomEmail(email: string): Promise<TUser>;
  isValidPassword(password: string, hashPassword: string): Promise<boolean>;
  isJWTTokenIssuedBeforePassword(
    issuedAt: number,
    passwordChangeAt: Date
  ): Promise<boolean>;
}
