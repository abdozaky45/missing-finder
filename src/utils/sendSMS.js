import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);
export const sendSMS = async (phone, messageBody) => {
    try {
      const message = await client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_FROM_NUMBER,
        to: phone,
      });
  
      console.log(` send message: ${message.sid}`);
      return ` send message: ${message.sid}`;
    } catch (error) {
      console.error(`not send message:${error.message}`);
      throw new Error(`not send message:${error.message}`);
    }
  };
