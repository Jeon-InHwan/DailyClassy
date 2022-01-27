import express from "express";
import {
  edit,
  upload,
  watch,
  deleteBoard,
} from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.get("/upload", upload);
boardRouter.get("/:id(\\d+)", watch);
boardRouter.get("/:id(\\d+)/edit", edit);
boardRouter.get("/:id(\\d+)/delete", deleteBoard);

export default boardRouter;
