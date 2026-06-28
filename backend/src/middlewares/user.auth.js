const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    // 1. Pehle token ko cookies se nikalein
    const token = req.cookies.token; 
    

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first!" });
    }
    
    
    // 2. Token ko verify karein
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Request object mein user ka data save karein
    req.user = decoded; 
    
    next(); // Agle function par bhejein

  } catch (error) {
    // Agar koi bhi error aayega (jaise ReferenceError ya JWT error), toh wo yahan catch hoga
    
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};

module.exports = authUser;