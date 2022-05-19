// const express = require("express");
// const dataRouter = express.Router();
// const { v4: uuidv4 } = require("uuid");
// const md5 = require("md5");
// const fs = require("fs");
// const { getDbInstance } = require("../db");
// const mongo = require("mongodb");
// dataRouter.get("/", async (req, res) => {
//   const users = await (await getDbInstance())
//     .collection("users")
//     .find({})
//     .toArray();
//   res.status(200).json(users).end();
// });
// dataRouter.post("/", async (req, res) => {
//   const data = (await getDbInstance()).collection("data").insertOne({
//     username: req.body.username,
//     password: md5(req.body.password),
//   });
//   console.log("req", req);
//   return res.status(200).end();
// });
// module.exports = dataRouter;
