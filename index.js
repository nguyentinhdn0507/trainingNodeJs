const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const { transporter } = require("./trainsporter");
require("dotenv").config();
const { getDbInstance } = require("./db");
// const { transporter } = require('./transporter')
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const downLoadRouter = require("./routes/download");
const { sendNewEmail } = require("./bull/emailQueue");
// const options = {
//   from: "anhdaonapa123@gmail.com",
//   to: "nguyentinhdn0507@gmail.com",
//   subject: "Hello",
//   html: "Hello I'm NodeJs, I Just Test Send Mail By Cron Job !",
// };
const port = process.env.PORT;
const main = async () => {
  await getDbInstance();
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use("/users", userRouter);
  app.use("/upload", uploadRouter);
  app.use("/download", downLoadRouter);
  // app.use("/data", dataUserRouter);
  app.post("/send-email", async (req, res) => {
    const { message, ...restBody } = req.body;
    await sendNewEmail({
      ...restBody,
      html: `<p>${message}</p>`,
    });
    res.send({ status: "ok" });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  // cron.schedule(" 5 21 * * *", () => {
  //   // console.log("running every minute 1, 2, 4 and 5");
  //   transporter.sendMail(options);
  //   console.log("sendmail");
  // });
};

main();
