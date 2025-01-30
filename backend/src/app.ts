import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { adminRouter, authRouter, kycRouter, userRouter } from "./routes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/kyc", kycRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

export default app;
