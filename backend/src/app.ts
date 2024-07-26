import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";
import cors from "cors";
config();
const app = express();

// middleware
app.use(
  cors({
    origin: "https://ai-chatbot-frontend-pearl.vercel.app",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove on production
app.use(morgan("dev"));
app.use("", appRouter);

export default app;
