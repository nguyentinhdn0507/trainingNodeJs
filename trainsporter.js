const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  // config mail server
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "anhdaonapa123@gmail.com", //Tài khoản gmail vừa tạo

    pass: "queanhqueanh", //Mật khẩu tài khoản gmail vừa tạo
  },
});
module.exports = { transporter };
