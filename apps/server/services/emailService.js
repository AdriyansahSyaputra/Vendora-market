import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "adah.muller28@ethereal.email",
    pass: "umpNHYqkdD8Aqak3tV",
  },
});

export const sendStatusUpdateEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Vendora Market" <noreply@vendora.com>',
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    // URL untuk melihat email yang dikirim di Ethereal
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
