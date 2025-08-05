import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import limiter from "./middleware/limiter.middleware.js";
import smsRoutes from "./routes/sms.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/sms", smsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
