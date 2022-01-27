import express from "express";
import {
  handleEdit,
  handleLogout,
  handleProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout);
userRouter.get("/:id/edit", handleEdit);
userRouter.get("/:id", handleProfile);

export default userRouter;
