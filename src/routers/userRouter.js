import express from "express";
import { handleEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", handleEdit);

export default userRouter;
