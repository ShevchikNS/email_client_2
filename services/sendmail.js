const nodemailer = require('nodemailer');

const crypto = require('./crypto');


const getEmailHost = (email) => {
  const host = email.substr(email.indexOf('@') + 1, email.length);
  return `smtp.${host}`;
};

const sendMail = async (user, to, subject, text) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: getEmailHost(user.username),
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user.username, // generated ethereal user
      pass: crypto.decrypt(user.password), // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"ME 👻" <${user.username}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  sendMail,
};
