const nodemailer = require("nodemailer");

const sendEmail = async (mailoptions) => {
  let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  let info = await transport.sendMail(mailoptions);
  console.log(`Message sent:${info.messageId}`);
};

module.exports = {
  sendEmail,
};
