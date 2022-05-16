const express = require("express");

require("dotenv").config();
const { getDbInstance } = require("./db");
// const { transporter } = require('./transporter')
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const downLoadRouter = require("./routes/download");
const cron = require("node-cron");
cron.schedule("1,2,4,5 * * * *", () => {
  console.log("running every minute 1, 2, 4 and 5");
});
const port = process.env.PORT;
const main = async () => {
  await getDbInstance();
  const app = express();
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/upload", uploadRouter);
  app.use("/download", downLoadRouter);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
