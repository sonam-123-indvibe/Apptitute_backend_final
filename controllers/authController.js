const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  PEHLE CHECK
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    //  userId BHEJNA ZAROORI + user name and role
    res.json({
      token,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error" });
  }
};

module.exports = { signup, login };
