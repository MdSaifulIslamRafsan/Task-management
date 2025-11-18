import mongoose from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },

  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});



userSchema.static(
  "isUserExistByCustomEmail",
  async function isUserExistByCustomEmail(email: string) {
    const existingUser = await User.findOne({ email }).select("+password");
    return existingUser;
  }
);


userSchema.statics.isValidPassword = async function (
  password: string,
  hashPassword: string
) {
  return await bcrypt.compare(password, hashPassword);
};

export const User = mongoose.model<TUser, UserModel>("User", userSchema);
