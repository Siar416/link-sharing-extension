import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

router.post("/", async (req, res) => {
  const { phoneNumber, link } = req.body;

  console.log(link, phoneNumber);

  if (!phoneNumber || !link) {
    return res
      .status(400)
      .json({ error: "Phone number and link are required" });
  }

  try {
    const message = await client.messages.create({
      body: `Here's a link for you: ${link}`,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(200).json({ success: true, sid: message.sid });
  } catch (error) {
    console.error(`Twilio error: ${error.message}`);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

router.get("/", (req, res) => {
  res.status(200).send("get route!");
});

export default router;
