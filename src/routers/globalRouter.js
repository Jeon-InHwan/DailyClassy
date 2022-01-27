import express from "express";
import { trendingBoardForHome } from "../controllers/boardController";
import { handleJoin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", trendingBoardForHome);
globalRouter.get("/join", handleJoin);

export default globalRouter;
