const User = require("../models/user");
const bcrypt = require("bcrypt");

// cadastro do usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // verificação para ver se o usuario já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    // aqui serve para criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria o usuario no banco
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "Usuario cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Falha ao cadastrar o usuario", error });
  }
};

// login do usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verificar se o usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Usuario não encontrado" });
    }

    // verifica se a senha esta correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Senha inválida!" });
    }

    res.status(200).json({ message: "Login efetuado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Error no servidor!" });
  }
};
