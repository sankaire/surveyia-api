import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create_user = async (
  name: string,
  email: string,
  phone: string
): Promise<object> => {
  const new_user = await prisma.users.create({
    data: { name: name, email: email, phone: phone },
  });
  return new_user;
};

export default { create_user };
