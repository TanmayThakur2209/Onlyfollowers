import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  coverPhoto: {
    path: { type: String }, 
  },
  
  profilePhoto: {
    path: { type: String }, 
  }
});

export default mongoose.model("User", user);
