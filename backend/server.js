import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import smsRoutes from "./routes/smsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sms", smsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
