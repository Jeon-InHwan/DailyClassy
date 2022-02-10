import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
