import express from "express";
import authenticateUser  from "../middleware/auth.js";
import multer from "multer";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log("Decoded user:", req.user);


    res.json({
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto || null,
      coverPhoto: user.coverPhoto || null,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
          cb(null, "uploads/");
    },
     filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload-photos", authenticateUser, upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'coverPhoto', maxCount: 1 }
]), async (req, res) => {
  console.log("REQ.FILES:", req.files);
console.log("REQ.BODY:", req.body);

  try {
    const userId = req.user.id;
    const updateFields = {};

    if (req.files.profilePhoto) {
      const file = req.files.profilePhoto[0];
      updateFields.profilePhoto = {
        filename: file.originalname,
        path: file.filename,
        mimetype: file.mimetype,
        size: file.size
      };
    }

    if (req.files.coverPhoto) {
      const file = req.files.coverPhoto[0];
      updateFields.coverPhoto = {
        filename: file.originalname,
        path: file.filename,
        mimetype: file.mimetype,
        size: file.size
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
      });

      res.json(updatedUser);
    } catch (err) {
      console.error("Photo upload error:", err);
      res.status(500).json({ error: "Failed to upload profile/cover photo" });
    }
  }
);
    
  router.delete("/delete-photo", authenticateUser, async (req, res) => {
  const { type } = req.query;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (type === "cover") user.coverPhoto = undefined;
    else if (type === "profile") user.profilePhoto = undefined;
    else return res.status(400).json({ error: "Invalid photo type" });

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).json({ error: "Failed to delete photo" });
  }
});

export default router;
