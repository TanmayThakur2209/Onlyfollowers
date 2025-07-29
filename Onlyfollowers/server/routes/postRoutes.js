import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import authenticateUser from "../middleware/auth.js";

const router =express.Router();
const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
          cb(null, "uploads/");
    },
     filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
 

router.post('/upload',authenticateUser, upload.array('files'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const files = req.files.map(file => ({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    }));

    const newPost = new Post({
      title,
      content,
      files,
      createdBy: userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    alert("Uploaded")
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Failed to upload post" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/my-posts", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ createdBy:userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findOne({ _id: postId, createdBy: userId });

    if (!post) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;