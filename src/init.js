import "./db";
import Post from "./models/Post";
import app from "./server";

const PORT = 4000;

const handleListening = () => {
  console.log(`✅ Sever is listening on port http://localhost:${PORT} 🚀`);
};

app.listen(4000, handleListening);
