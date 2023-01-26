import dotenv from "dotenv";
import axios from "axios";
import url from "url";

dotenv.config();

const NAMESPACE = "TANDA API";
const AUTH_URL = process.env.TANDA_AUTH_URL;
const INITIATE_PAYMENT_URL = `${process.env.TANDA_PAYMENT_BASE_URL}/${process.env.TANDA_ORG_ID}/requests`;
const QUERY_PAYMENT_URL = `${process.env.TANDA_PAYMENT_BASE_URL}/${process.env.TANDA_ORG_ID}/requests/`;
const INITIATE_WITHDRAW_URL = INITIATE_PAYMENT_URL;

export default class TandaAPI {
  clientID: String | undefined;
  clientSecret: String | undefined;
  accessToken: String;

  constructor() {
    this.clientID = process.env.TANDA_CLIENT_ID;
    this.clientSecret = process.env.TANDA_CLIENT_SECRET;
    this.accessToken = "";
  }

  private async getAccessToken(): Promise<void> {
    let auth = Buffer.from(`${this.clientID}:${this.clientSecret}`).toString(
      "base64"
    );

    let headers = {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };

    let body = {
      grant_type: "client_credentials",
    };

    let response;

    try {
      response = await axios.post(
        process.env.TANDA_AUTH_URL as string,
        new url.URLSearchParams(body),
        {
          headers,
        }
      );
    } catch (error: any) {
      //   logging.error(
      //     NAMESPACE,
      //     "Error getting access token",
      //     error.response?.data?.error
      //   );
      throw new Error(`Failed to get access token: ${error.message}`);
    }

    this.accessToken = response?.data?.access_token;
  }

  private generatePaymentPayload(
    amount: Number,
    phoneNumber: String,
    debug: Boolean
  ) {
    let payload = {
      commandId: "CustomerPayment",
      serviceProviderId: "MPESA",
      requestParameters: [
        {
          id: "amount",
          value: debug ? 10 : amount,
          label: "Amount",
        },
        {
          id: "accountNumber",
          value: phoneNumber,
          label: "phone number",
        },
      ],
      referenceParameters: [
        {
          id: "resultUrl",
          value: process.env.TANDA_CB_URL,
          label: "Callback URL",
        },
      ],
    };
    return payload;
  }

  async initiatePayment(
    amount: Number,
    phoneNumber: String,
    debug: Boolean
  ): Promise<String> {
    await this.getAccessToken();

    let headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };

    let url = INITIATE_PAYMENT_URL;

    let payload = this.generatePaymentPayload(amount, phoneNumber, debug);
    // payload.requestParameters[0].value = Number(amount);

    let response;

    try {
      response = await axios.post(url, payload, { headers });
    } catch (error: any) {
      //   logging.error(NAMESPACE, "Error initiating payment", error);
      if (error?.response?.status === 500) {
        throw new Error(`Failed to initiate payment: Tanda Server Error`);
      }

      if (error?.response?.status === 400) {
        throw new Error(`Failed to initiate payment: Authentication Failure`);
      }

      throw new Error(error?.response?.data);
    }
    if (response?.data?.status !== "000001") {
      throw new Error(response?.data?.message);
    }

    let refId = response?.data?.id || "";
    return refId;
  }
}
