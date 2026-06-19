const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userAlreadyExist = await userModel.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role === "creator" ? "creator" : "user",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" },
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User is created successfully",
      success: true,
      user: { name: user.name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: true, message: "invalid credentials" });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res
      .status(400)
      .json({ success: true, message: "invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" },
  );

  res.cookie("token", token, { httpOnly: true });

  return res.status(201).json({
    message: "User is loged in successfully",
    success: true,
    user: { name: user.name, role: user.role },
  });
};

module.exports = { registerUser, loginUser };
