import express from "express";
import {
  getEdit,
  postEdit,
  finishGithubLogin,
  logout,
  profile,
  startGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  avatarUploadMiddleware,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUploadMiddleware.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/:id([0-9a-f]{24})", profile);

export default userRouter;
