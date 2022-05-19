const express = require("express");
const userRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");
const fs = require("fs");
const { getDbInstance } = require("../db");
const mongo = require("mongodb");

userRouter.get("/", async (req, res) => {
  const users = await (await getDbInstance())
    .collection("users")
    .find({})
    .toArray();
  res.status(200).json(users).end();
});
userRouter.get("/:id", (req, res) => {
  let users;
  fs.readFile("users.json", "utf8", function (err, data) {
    users = JSON.parse(data);
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
      return res.status(400).json({ message: "user not found!" }).end();
    }
    res.status(200).json(user).end();
  });
});
userRouter.post("/", async (req, res) => {
  if (req.body.password.length < 5) {
    return res.status(400).json({ message: "password invalid" }).end();
  }
  const user = (await getDbInstance()).collection("users").insertOne({
    username: req.body.username,
    password: md5(req.body.password),
  });
  console.log("req", req);
  return res.status(200).end();
});
userRouter.post("/login", async (req, res) => {
  console.log("body",req.body)
  if (req.body.password.length < 5) {
    return res.status(400).json({ message: "password invalid" }).end();
  }
  console.log(md5(req.body.password))
  const user = await (await getDbInstance()).collection("users").findOne({
    username: req.body.username,
    password: md5(req.body.password),
  });
  console.log(user)
  if (user) {
    return res.status(200).json({ message: "Login success" }).end();
  }else {
    return res.status(400).json({ message: "User Name Or Password Wrong" }).end()
  }
  // console.log("req", req);
});
userRouter.put("/:id", async (req, res) => {
  try {
    const query = { _id: new mongo.ObjectID(req.params.id) };
    const newValue = { $set: req.body };
    (await getDbInstance())
      .collection("users")
      .updateOne(query, newValue, (err, value) => {
        res.status(200).json({ message: "update success" }).end();
      });
  } catch (error) {
    console.log("update failed", error);
    res.status(400).json({ message: "user not found!" }).end();
  }
});
userRouter.delete("/:id", async (req, res) => {
  console.log("aaa");
  try {
    const query = { _id: new mongo.ObjectID(req.params.id) };
    (await getDbInstance())
      .collection("users")
      .deleteOne(query, (err, value) => {
        res.status(200).json({ message: "Delete success" }).end();
      });
  } catch (error) {
    console.log("Delete failed", error);
    res.status(400).json({ message: "user not found!" }).end();
  }
});
module.exports = userRouter;
