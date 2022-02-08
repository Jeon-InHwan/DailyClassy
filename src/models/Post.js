import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    minLengh: 2,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000,
    minLengh: 2,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
