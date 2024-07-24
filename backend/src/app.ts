import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";
import cors from "cors";
config();
const app = express();

// middleware
app.use(cors({ origin: "", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove on production

app.use("/api/v1", appRouter);

export default app;
