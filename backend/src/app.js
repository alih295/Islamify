const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path')
const cookieParser = require("cookie-parser");
const musicRoute = require("./Routes/music.route");
const userRouter = require("../src/Routes/user.route");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);


app.use("/uploads", express.static("uploads"));
app.use("/api/music", musicRoute);
app.use("/api/auth", userRouter);

module.exports = app;
