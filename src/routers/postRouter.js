import express from "express";
import {
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  watch,
  deletePost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postRouter.get("/:id([0-9a-f]{24})/delete", deletePost);

export default postRouter;
