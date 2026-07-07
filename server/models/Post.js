import mongoose from "mongoose";

const post =new mongoose.Schema({
    title : {type :String, required: true},
    content: {type: String},
    files: [{
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String },
  size: { type: Number }
}],

    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
})

export default mongoose.model("Post", post);