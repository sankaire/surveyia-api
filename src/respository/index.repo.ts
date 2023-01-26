import User from "../interfaces";
import UserModel from "../schemas/users";
import Questionare from "../schemas/questionare";

const create_user = async (
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<User> => {
  const new_user = new UserModel({
    name: name,
    email: email,
    phone: phone,
    password: password,
  });
  await new_user.save();
  return new_user;
};
const create_questionare = async (
  user_id: string,
  title: string,
  payout: string,
  description: string,
  questions: Array<object>
) => {
  const new_questionare = new Questionare({
    user_id: user_id,
    title: title,
    payaout: payout,
    description: description,
    questions: questions,
  });
  await new_questionare.save();
  return new_questionare;
};

export default {
  create_user,
  create_questionare,
};
