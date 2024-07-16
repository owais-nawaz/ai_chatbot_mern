import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
config();
const app = express();

// middkewares
app.use(express.json());

// remove on production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
