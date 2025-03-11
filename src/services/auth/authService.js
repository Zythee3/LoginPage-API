const bcrypt = require("bcrypt");
const User = require("../models/user");

const AuthUpdatePassword = async (email) => {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    // verifica se a senha está correta
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    // criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
}