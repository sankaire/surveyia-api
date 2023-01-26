import { Request, Response } from "express";
import indexRepo from "../../respository/index.repo";

const create_new_questionare = async (
  req: Request,
  res: Response
): Promise<object> => {
  const { title, payout, description, questions } = req.body;
  try {
    const user_id = req.user.id;
    const questionare = await indexRepo.create_questionare(
      user_id,
      title,
      payout,
      description,
      questions
    );
    if (!questionare) {
      return res.status(400).json({
        success: false,
        message: "qustionare not created",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Question created",
      data: questionare,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: true, message: error.message, data: error });
  }
};
export default { create_new_questionare };
