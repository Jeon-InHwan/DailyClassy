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
postRouter.get("/:id(\\d+)", watch);
postRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
postRouter.get("/:id(\\d+)/delete", deletePost);

export default postRouter;
