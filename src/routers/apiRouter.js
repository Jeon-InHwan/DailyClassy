import express from "express";

import {
  registerView,
  createComment,
  deleteComment,
  morePosts,
} from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id([0-9a-f]{24})/view", registerView);

apiRouter.post("/posts/:id([0-9a-f]{24})/comment", createComment);

apiRouter.delete("/posts/:id([0-9a-f]{24})/comment", deleteComment);

apiRouter.get("/posts/more", morePosts);

export default apiRouter;
