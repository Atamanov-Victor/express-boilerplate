require('dotenv').config();
const nodemailer = require('nodemailer');

class Mailer {
  constructor(smtpOptions) {
    const transporter = nodemailer.createTransport({
      host: smtpOptions.host,
      port: smtpOptions.port,
      secure: true,
      auth: {
        user: smtpOptions.user,
        pass: smtpOptions.pass,
      },
    });

    this.transporter = transporter;
  }

  async send(payload) {
    const { from, to, subject, html } = payload;

    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return info;
  }
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

module.exports = new Mailer({
  host: SMTP_HOST,
  port: SMTP_PORT,
  user: SMTP_USER,
  pass: SMTP_PASSWORD,
});
