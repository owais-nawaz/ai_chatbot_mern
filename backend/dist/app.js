import express from "express";
import { config } from "dotenv";
config();
const app = express();
// middkewares
app.get("/hello", (req, res, next) => {
    return res.send("Hello");
});
export default app;
//# sourceMappingURL=app.js.map