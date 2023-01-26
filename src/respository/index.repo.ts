import User from "../interfaces";
import UserModel from "../schemas/users";

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

export default { create_user };
