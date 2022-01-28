import express from "express";
import {
  getEdit,
  postEdit,
  upload,
  watch,
  deleteBoard,
} from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.get("/upload", upload);
boardRouter.get("/:id(\\d+)", watch);
boardRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
boardRouter.get("/:id(\\d+)/delete", deleteBoard);

export default boardRouter;
