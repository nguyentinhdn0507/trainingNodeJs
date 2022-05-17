const express = require("express");
const downLoadRouter = express.Router();
const fs = require("fs");
const multer = require("multer");
const { getDbInstance } = require("../db");
const path = require("path");
const ObjectId = require("mongodb").ObjectID;
const sharp = require("sharp");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("destination");
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("File Name", file);
    // console.log("filename", file);
    let error = null;
    if (!file.originalname.startsWith("IMG")) error = "Name Invalid";
    const fileType = path.extname(file.originalname);
    cb(
      error ? new Error(error) : null,
      `${file.fieldname}-${Date.now()}${fileType}`
    );
  },
});
downLoadRouter.get("/resize/:id", async (req, res) => {
  // step 1 : lấy praram Id
  const id = req.params.id;
  // step 2 : lấy meta data của file từ database
  let meta = await (await getDbInstance()).collection("uploads").findOne({
    _id: new ObjectId(id),
  });
  console.log("meta", meta);
  const dir = `./uploads/${meta.filename}`;
  console.log("dir", dir);
  res.setHeader("Content-type", meta.mimetype);
  // res.setHeader("Content-disposition", `attachment; filename=TinhNguyen.jpg`);
  // step 3 : đọc file và gửi về client
  sharp(dir).resize(150, 150).pipe(res);
  res.header(
    "Content-Disposition",
    'attachment; filename="' + meta.filename + '"'
  );
  console.log("file", req.file);
});
downLoadRouter.get("/original/:id", async (req, res) => {
  // step 1 : lấy praram Id
  const id = req.params.id;
  // step 2 : lấy meta data của file từ database
  let meta = await (await getDbInstance()).collection("uploads").findOne({
    _id: new ObjectId(id),
  });
  console.log("meta", meta);
  const dir = `./uploads/${meta.filename}`;
  console.log("dir", dir);
  // res.setHeader("Content-type", meta.mimetype);
  // res.setHeader("Content-disposition", `attachment; filename=TinhNguyen.jpg`);
  // step 3 : đọc file và gửi về client
  res.download(dir);
});
module.exports = downLoadRouter;
