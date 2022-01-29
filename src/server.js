import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";

const PORT = 4000;

const app = express();
const loggerMiddleware = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

const handleListening = () => {
  console.log(`✅ Sever is listening on port http://localhost:${PORT} 🚀`);
};

app.listen(4000, handleListening);
