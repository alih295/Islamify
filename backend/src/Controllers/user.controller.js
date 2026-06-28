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

    res.cookie("token", token);

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

  res.cookie("token", token);

  return res.status(201).json({
    message: "User is loged in successfully",
    success: true,
    user: { name: user.name, role: user.role },
  });
};


 const getMe = async (req, res) => {
  try {

  
    const user = await userModel.findById(req.user.id).select("-password"); // Password 
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error in getMe controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


const logout = async (req, res) => {
  try {
    // Cookie ko delete karne ke liye .clearCookie() ka use karein
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Development mein false, production mein true
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};



module.exports = { registerUser, loginUser ,getMe , logout};
