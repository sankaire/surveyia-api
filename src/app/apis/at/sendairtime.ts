import { Client } from "africastalking-ts";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  apiKey: process.env.AT_KEY as string,
  username: process.env.AT_USERNAME as string,
});

async function send_airtime(amount: number, phone: string) {
  const send = await client.sendAirtimeRequest({
    recipients: [
      {
        phoneNumber: phone,
        currencyCode: "KES",
        amount: amount,
      },
    ],
  });
  console.log(send);
}

export default { send_airtime };
