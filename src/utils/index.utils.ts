import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const secret: string = process.env.JWT_SECRET as string;

const createToken = (userID: string) => {
  const token = jwt.sign({ data: userID }, secret, { expiresIn: "1h" });
  return token;
};
const encrypt = async (value: string): Promise<string> => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(value, saltRounds);
  return hash;
};
const compare = async (
  password: string,
  savedPass: string
): Promise<boolean> => {
  const comparePass = await bcrypt.compare(savedPass, password);
  return comparePass;
};
export default { createToken, compare, encrypt };
