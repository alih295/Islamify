const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    // 1. FIX: res.cookies ki jaga req.cookies kiya
    const token = req.cookies.token; 

    if (!token) {
      return res
        .status(401) // 402 ko 401 (Unauthorized) kiya
        .json({ success: false, message: "Please login first!" }); // message ki spelling fix ki
    }

    // 2. Token ko verify karein
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // 3. Request object mein user ka data (id aur role) save karein
    req.user = decoded; 
    
    next(); // Agle function (controller) par bhejein

  } catch (error) {
    // Agar token fake ya expire hoga toh server crash nahi hoga, yeh response jayega:
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};

module.exports = authUser;