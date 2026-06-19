const express = require("express");
const { getAllMusic, createMusic } = require("../Controllers/music.controller");
const router = express.Router();
const upload = require("../config/multer/multer");
const authUser = require("../middlewares/user.auth");

router.get("/get", authUser, getAllMusic);
router.post("/create", authUser, upload.single("audioFile"), createMusic);

module.exports = router;
