import { Request, Response } from "express";
import indexRepo from "../../respository/index.repo";
import UserModel from "../../schemas/users";
import TandaAPI from "../../app/apis/daraja";
import Questionare from "../../schemas/questionare";
import sendairtime from "../../app/apis/at/sendairtime";

const create_new_questionare = async (
  req: Request,
  res: Response
): Promise<object> => {
  const { title, payout, description, questions, topup } = req.body;
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
    const user = await UserModel.findOne({ _id: user_id });
    const phone = user?.phone;
    if (phone === undefined) {
      throw Error("Phone number is undefined");
    }
    let payment = new TandaAPI();
    await payment.initiatePayment(topup, phone, true);
    return res.status(200).json({
      success: true,
      message: "Question created",
      data: { id: questionare._id },
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: true, message: error.message, data: error });
  }
};
const get_questionare = async (req: Request, res: Response) => {
  const { questionare_id } = req.params;
  try {
    const questionare = await Questionare.findOne({ _id: questionare_id });
    if (!questionare) {
      return res.status(400).json({
        success: false,
        message: "qustionare not created",
        data: null,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Questions Fetched", data: questionare });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: true, message: error.message, data: error });
  }
};
const get_questionare_response = async (req: Request, res: Response) => {
  const { response, phone } = req.body;
  const { questionare_id } = req.params;

  try {
    const questionare = await Questionare.findOne({ _id: questionare_id });
    const payout = questionare?.payaout;
    if (payout === undefined) {
      throw Error;
    }
    if (response.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Answer all questions", data: null });
    }
    await sendairtime.send_airtime(parseInt(payout), phone);
    return res.status(200).json({ success: true, message: "airtime sent" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: true, message: error.message, data: error });
  }
};
export default {
  create_new_questionare,
  get_questionare,
  get_questionare_response,
};
