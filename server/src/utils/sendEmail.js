import nodemailer from "nodemailer";

// Send email using Nodemailer
const sendEmail = async (options) => {
  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Setup email data with unicode symbols
  const mailOptions = {
    from: process.env.EMAIL_FROM || `NotivaApp <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
