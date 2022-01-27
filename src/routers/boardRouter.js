import express from "express";
import { handleEdit, handleWatch } from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.get("/watch", handleWatch);
boardRouter.get("/edit", handleEdit);

export default boardRouter;
