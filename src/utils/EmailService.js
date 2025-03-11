const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendRecoveryEmail = async (email, code) =>{
    try{
        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperação de Senha",
            text: `Seu código verificação ${code}`
        });
        return true;
    }
    catch (error) {
        console.log("Erro ao enviar email");
        return false;
    }
}

module.exports = sendRecoveryEmail;