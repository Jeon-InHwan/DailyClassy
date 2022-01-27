import express from "express";
import { edit, logout, profile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id/edit", edit);
userRouter.get("/:id", profile);

export default userRouter;
