import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import smsRoutes from "./routes/sms.routes.js";

dotenv.config();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: `Sorry, you've reached your max number to links you can share: ${max}, please sign up to get 20 link shares an hour`,
  headers: true,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/sms", smsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
