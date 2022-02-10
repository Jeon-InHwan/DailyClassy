import express from "express";
import morgan from "morgan";
import sesstion from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";
import session from "express-session";
import { localsMiddleware } from "./middleware";

const app = express();
const loggerMiddleware = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));

// use express-session middleware
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

export default app;
