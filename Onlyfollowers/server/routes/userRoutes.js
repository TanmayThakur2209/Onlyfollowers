import express from "express";
import authenticateUser  from "../middleware/auth.js";
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


router.post("/upload-photos", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { coverPhoto, profilePhoto } = req.body;

    const update = {};
    if (coverPhoto) update.coverPhoto = { path: coverPhoto };
    if (profilePhoto) update.profilePhoto = { path: profilePhoto };

    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Cloudinary URL photo upload error:", error);
    res.status(500).json({ error: "Failed to update user photos" });
  }
});
    

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
