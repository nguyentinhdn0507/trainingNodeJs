const nodemailer = require("nodemailer");
const emailProcess = async (job, done) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let info = await transporter.sendMail(job.data);
  console.log("Message sent: %s", info.messageId);
  done(null, nodemailer.getTestMessageUrl(info));
  console.log(
    "nodemailer.getTestMessageUrl(info)",
    nodemailer.getTestMessageUrl(info)
  );
};

module.exports = { emailProcess };
