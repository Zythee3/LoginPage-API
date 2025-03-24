const bcrypt = require("bcrypt");
const User = require("../../models/user");
const sendEmail = require("../../utils/emailService")

const AuthUpdatePassword = async (userInfo) => {
  const user = await User.findOne({ email: userInfo?.email });
  if (!user) {
    return { success: false, message: "Usuário não encontrado!" };
  }

  // verifica se a senha está correta
  const isMatch = await bcrypt.compare(
    userInfo?.currentPassword,
    user?.password
  );
  if (!isMatch) {
    return { success: false, message: "Senha atual incorreta!" };
  }

  // criptografa a senha antes de salvar no banco
  const hashedPassword = await bcrypt.hash(userInfo?.newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  return { success: true, message: "Senha alterada com sucesso!" };
};


const AuthLogin = async (userInfo) => {
  const { email, password } = userInfo;

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "Usuario não encontrado!" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Senha inválida!" };
  }

  sendEmail("zmatheusguilherme2@gmail.com");

  return { success: true, message: "Login efetuado com sucesso!" };
};

const AuthRegister = async (userInfo) => {
  const user = await User.findOne({ email: userInfo?.email });
  if (user) {
    return { success: false, message: "Email já cadastrado" };
  }

  // aqui serve para criptografar a senha
  const hashedPassword = await bcrypt.hash(userInfo?.password, 10);

  // cria o usuario no banco
  const newUser = new User({ name: userInfo?.name, email: userInfo?.email, password: hashedPassword });
  await newUser.save();
  return {success: true, message: "Usuário cadastrado com sucesso!"}
};


module.exports = { AuthUpdatePassword, AuthLogin, AuthRegister };
