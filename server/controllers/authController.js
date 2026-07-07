import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const check = await User.findOne({ username });
    if (check) return res.status(400).json({ error: "User Already Exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    const token = jwt.sign({ id: user._id,username: user.username,}, process.env.JWT_SECRET);
    res.json({ token });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id,username: user.username,}, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
     console.error("Login error:", err); 
    res.status(500).json({ error: "Login failed" });
  }
  console.log("Received login body:", req.body);

};
