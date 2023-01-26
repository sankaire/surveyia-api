import { Request, Response } from "express";
import indexRepo from "../../respository/index.repo";

const create_new_user = async (
  req: Request,
  res: Response
): Promise<object> => {
  const { name, email, phone } = req.body;
  try {
    const new_user = await indexRepo.create_user(name, email, phone);
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

export default { create_new_user };
