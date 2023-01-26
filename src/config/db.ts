import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connect(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("conected to db");
  } catch (error) {
    console.log(error);
    return error;
  }
}
