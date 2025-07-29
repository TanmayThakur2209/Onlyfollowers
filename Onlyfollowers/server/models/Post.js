import mongoose from "mongoose";

const post =new mongoose.Schema({
    title : {type :String, required: true},
    content: {type: String},
    files: [
        {
        filename: String,
        path: String,
        mimetype: String,
        size: Number,
    }
    ],
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
})

export default mongoose.model("Post", post);