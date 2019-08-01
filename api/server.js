const express = require("express");
const server = express();
const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", async (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;