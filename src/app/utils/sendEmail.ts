import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, emailHtml: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "mahmudulhaquenoor@gmail.com",
      pass: "ziej figq xzrg reyt",
    },
  });

  await transporter.sendMail({
    from: "mahmudulhaquenoor@gmail.com", // sender address
    to,
    subject: "Reset Your Password Securely🔐", // Subject line
    text: "We received a request to reset your password. You can reset it by clicking the link below:", // plain text body
    html: emailHtml,
  });
};
