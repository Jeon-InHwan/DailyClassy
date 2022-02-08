import express from "express";
import { edit, logout, profile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id([0-9a-f]{24})/edit", edit);
userRouter.get("/:id([0-9a-f]{24})", profile);

export default userRouter;
