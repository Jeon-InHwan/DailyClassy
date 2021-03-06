import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";
const path = require("path");

const app = express();
const loggerMiddleware = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));

// use express-session middleware
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use(
  "/js",
  express.static(path.resolve(__dirname, "..") + "/node_modules/jquery/dist")
);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
