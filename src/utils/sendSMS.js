import dotenv from "dotenv";
dotenv.config();
import pkg from 'follow-redirects';
import fs from 'fs';
const { https } = pkg;

export const smsInfo = (text) => {
  var options = {
    'method': 'POST',
    'hostname': process.env.API_BASE_URL,
    'path': '/sms/2/text/advanced',
    'headers': {
      'Authorization': process.env.API_KEY_SMS,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'maxRedirects': 20
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    "messages": [
      {
        "destinations": [{ "to": "201025502697" }],
        "from": "missing finder",
        text
      }
    ]
  });

  req.write(postData);

  req.end();
}







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
