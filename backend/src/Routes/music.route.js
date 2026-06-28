const express = require("express");
const { getAllMusic, createMusic } = require("../Controllers/music.controller");
const router = express.Router();
const upload = require("../config/multer/multer");
const authUser = require("../middlewares/user.auth");

router.get("/get", getAllMusic);
router.post(
  "/create",
  authUser,
  upload.fields([
    { name: "audioFile", maxCount: 1 }, // Audio file ke liye field name
    { name: "coverImg", maxCount: 1 }, // Image file ke liye field name
  ]),
  createMusic,
);

module.exports = router;
