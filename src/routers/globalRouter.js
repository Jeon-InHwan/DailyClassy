import express from "express";
import { trendingBoardForHome, search } from "../controllers/boardController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", trendingBoardForHome);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
