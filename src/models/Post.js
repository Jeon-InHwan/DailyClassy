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
  pics: [{ type: String, required: true }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

/*
postSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
*/

postSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Post = mongoose.model("Post", postSchema);
export default Post;
