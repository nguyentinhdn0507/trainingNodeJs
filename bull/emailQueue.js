// const { setQueues } = require("bull-board");
const Bull = require("bull");
const { emailProcess } = require("./emailProcess");
// const { emailProcess } = require("./emailProcess");
const emailQueue = new Bull("email");
emailQueue.process(emailProcess);
const sendNewEmail = (data) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};

module.exports = { sendNewEmail };
