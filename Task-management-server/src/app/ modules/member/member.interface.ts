import { Model, Types } from "mongoose";

export interface TMember {
  _id: Types.ObjectId;
  name: string;
  role: string;
  capacity: number;
  currentLoad: number;
  teamId: Types.ObjectId;
}

export interface MemberModel extends Model<TMember> {
  isMemberExistByName(name: string): Promise<TMember>;
}
