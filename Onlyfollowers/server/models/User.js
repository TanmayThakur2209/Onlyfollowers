import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coverPhoto: {
  filename: String,
  path: String,
  mimetype: String,
  size: Number
},
profilePhoto: {
  filename: String,
  path: String,
  mimetype: String,
  size: Number
}

});

export default mongoose.model("User", user);
