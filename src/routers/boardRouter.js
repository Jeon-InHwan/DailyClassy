import express from "express";
import {
  handleEdit,
  handleUpload,
  handleWatch,
  handleDelete,
} from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.get("/upload", handleUpload);
boardRouter.get("/:id(\\d+)", handleWatch);
boardRouter.get("/:id(\\d+)/edit", handleEdit);
boardRouter.get("/:id(\\d+)/delete", handleDelete);

export default boardRouter;
