import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async (): Promise<string> => {
  const consumerKey: string = "5mM2bmH2zU4KGFu5OtAnMl4f3i7LVd6A";
  const consumerSecret: string = "8v4emaGtd1k2iIdr";
  const url: string =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const buffer = Buffer.from(consumerKey + ":" + consumerSecret);
  const auth = `Basic ${buffer.toString("base64")}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    return data.access_token;
  } catch (err: any) {
    return err;
  }
};
const mpesaCallbackHelper = async (
  phone: number,
  amount: number,
  mpesaReceipt_id: string,
  currency: string,
  time: number
): Promise<object | null | void> => {
  const phoneNumber = "+" + phone.toString();
};

export default { generateToken, mpesaCallbackHelper };
