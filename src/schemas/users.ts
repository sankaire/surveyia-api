import { Schema, model } from "mongoose";
import User from "../interfaces";

const user_schema = new Schema<User>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = model("UserModel", user_schema);
export default UserModel;
