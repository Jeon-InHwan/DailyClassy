import express from "express";
import { trendingPostForHome, search } from "../controllers/postController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", trendingPostForHome);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
