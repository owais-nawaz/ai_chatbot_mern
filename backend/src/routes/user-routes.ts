import { Router } from "express";
import { getAllUsers } from "../controllers/user-controllers";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

export default userRoutes;
