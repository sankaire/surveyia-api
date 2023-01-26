import { Request, Response } from "express";
import indexRepo from "../../respository/index.repo";
import indexUtils from "../../utils/index.utils";
import UserModel from "../../schemas/users";

interface User {
  _id: string;
  name: string;
  password: string;
  phone: string;
}

const create_new_user = async (
  req: Request,
  res: Response
): Promise<object> => {
  const { name, email, phone, password } = req.body;
  try {
    const hash_pass = await indexUtils.encrypt(password);
    const new_user = await indexRepo.create_user(name, email, phone, hash_pass);
    console.log(new_user);
    // const token = indexUtils.createToken(new_user._id);
    if (!new_user) {
      return res
        .status(400)
        .json({ success: false, message: "User not created", data: null });
    }
    return res
      .status(200)
      .json({ success: true, message: "User created", data: new_user });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: error });
  }
};
const sign_in = async (req: Request, res: Response): Promise<object> => {
  const { email, password } = req.body;
  try {
    const check_user = await UserModel.findOne({ email: email });
    if (!check_user) {
      return res
        .status(403)
        .json({ success: true, message: "User dosen't exist", data: null });
    }
    const saved_password = check_user.password;
    const check_password = await indexUtils.compare(saved_password, password);
    if (!check_password) {
      return res
        .status(403)
        .json({ success: true, message: "Wrong password", data: null });
    }
    const token = indexUtils.createToken(check_user._id);
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      data: { user_id: check_user._id, token: token },
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: error });
  }
};

export default { create_new_user, sign_in };
