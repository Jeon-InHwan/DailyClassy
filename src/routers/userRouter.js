import express from "express";
import {
  edit,
  finishGithubLogin,
  logout,
  profile,
  startGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id([0-9a-f]{24})/edit", edit);
userRouter.get("/:id([0-9a-f]{24})", profile);

export default userRouter;
