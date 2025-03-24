const nodemailer = require("nodemailer");
const User = require("../models/user");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// gera o código aleatorio
const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = async (email) => {
  const user = await User.findOneAndUpdate(
    { email },
    { verificationCode },
    { new: true, upsert: true }
  );

  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de acesso",
      text: `Seu código verificação ${verificationCode} não compartilhe esse código com ninguém`,
    });
    return true;
  } catch (error) {
    console.log("Erro ao enviar email", error);
    return false;
  }
};

module.exports = sendEmail;
