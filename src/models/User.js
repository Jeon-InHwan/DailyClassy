import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
    minLengh: 5,
  },
  ID: {
    type: String,
    required: true,
    unique: true,
    maxLength: 12,
    minLengh: 5,
  },
  password: { type: String, required: true, maxLength: 12, minLengh: 5 },
  name: { type: String, required: true, minLengh: 2 },
  location: { type: String, minLengh: 2 },
});

const User = mongoose.model("User", userSchema);

export default User;
